from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from .serializers import UploadSerializer

from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_community.document_loaders import PyPDFLoader


class TaskAnalyzer:
    def __init__(self, pdf_path: str):
        self.pdf_path = pdf_path
        self.loader = PyPDFLoader(pdf_path)
        self.llm = ChatOpenAI(
            model="gpt-3.5-turbo",
            temperature=0,
            openai_api_key=settings.OPENAI_API_KEY,
        )
        self.embeddings_model = OpenAIEmbeddings(
            model="text-embedding-3-large",
            openai_api_key=settings.OPENAI_API_KEY,
        )
        self.vectorstore = None
        self.retriever = None
        self.rag_chain = None

    def load_pdf_and_split(self):
        pages = self.loader.load_and_split()
        return pages

    def create_retriever(self, pages):
        self.vectorstore = FAISS.from_documents(pages, self.embeddings_model)
        self.retriever = self.vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 6})
    
    def get_template(self):
        return """ You are an assignment task analysis tool. Your task is to read the input pages and provide a breakdown of tasks and subtasks for the assignment.

            1. Analyze the input pages to identify the main tasks and subtasks required for the assignment.
            2. Present the tasks and subtasks in a structured format, with clear hierarchy and organization.
            3. Ensure that the breakdown is comprehensive and covers all significant aspects of the assignment.
            4. Use bullet points or numbered lists to present the tasks and subtasks clearly.
            """

    def create_rag_chain(self):
        template = self.get_template()
        custom_rag_prompt = PromptTemplate.from_template(template)
        self.rag_chain = (
            {"context": self.retriever | format_docs, "question": RunnablePassthrough()}
            | custom_rag_prompt
            | self.llm
            | StrOutputParser()
        )

    def summarize_tasks(self):
        output = self.rag_chain.invoke("summarise")
        return output

    def convert_task_breakdown_to_json(self, output_text):
        tasks = {}
        current_task = None
        for line in output_text.split("\n"):
            line = line.strip()
            if line.startswith("Task"):
                current_task = line.split(":")[1].strip()
                tasks[current_task] = []
            elif line.startswith("- Subtask"):
                tasks[current_task].append(line.split(":")[1].strip())
        return tasks

# Create your views here.
class UploadViewSet(ViewSet):
    serializer_class = UploadSerializer

    def create(self, request):
        file_uploaded = request.FILES.get('files')
        file_name = FileSystemStorage(location="./tmp").save(file_uploaded.name, file_uploaded)
        file_path = FileSystemStorage(location="./tmp").path(file_name)
        response = {
            "error": "Unable to execute open AI endpoints"
        }
        try:
            analyzer = TaskAnalyzer(file_path)
            pages = analyzer.load_pdf_and_split()
            analyzer.create_retriever(pages)
            analyzer.create_rag_chain()
            output = analyzer.summarize_tasks()
            response = analyzer.convert_task_breakdown_to_json(output)
        except:
            print("Unable to fetch response from Open AI endpoint")
        FileSystemStorage(location="./tmp").delete(file_name)
        return Response(data=response, status=status.HTTP_200_OK)
