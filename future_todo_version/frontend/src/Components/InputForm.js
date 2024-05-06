// import React, { useState } from 'react';
// import { FileInput, Label, TextInput, Datepicker} from 'flowbite-react';

// function InputForm() {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [name, setName] = useState('');
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     setSelectedFiles(files);
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault(); // Prevent default form submission behavior

//     if (!selectedFiles.length) {
//       alert('Please select some files to upload.');
//       return;
//     }

//     if (!name) {
//       alert('Please enter your name.');
//       return;
//     }

//     const formData = new FormData();
//     for (const file of selectedFiles) {
//       formData.append('files', file); // Assuming your backend expects 'files' as the key
//     }

//     formData.append('name', name); // Add name field to FormData

//     // Handle date conversion and appending to FormData (optional)
//     if (selectedDate) {
//       const formattedDate = selectedDate.toISOString(); // Convert to ISO format
//       formData.append('date', formattedDate);
//     }

//     try {
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Upload failed');
//       }

//       const data = await response.json();
//       console.log('Upload successful:', data);

//       // Handle successful upload (e.g., clear form, display confirmation)
//       setSelectedFiles([]);
//       setName('');
//       setSelectedDate(null);
//     } catch (error) {
//       console.error('Upload error:', error);
//       alert('An error occurred during upload. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="multiple-file-upload" value="Upload multiple files" />
//           <FileInput id="multiple-file-upload" multiple onChange={handleFileChange} />
//         </div>
//         <div>
//           <Label htmlFor="name" value="Your Name" />
//           <TextInput id="name" type="text" onChange={handleNameChange} value={name} />
//         </div>
//         <div className="mt-4">
//           <Label htmlFor="date-picker" value="Select Date (Optional)" />
//           <Datepicker id="date-picker" onChange={handleDateChange} value={selectedDate} />
//         </div>
//       </div>


//       <button type="submit" className="mt-4">Upload</button>
//     </form>
//   );
// }

// export default InputForm;
