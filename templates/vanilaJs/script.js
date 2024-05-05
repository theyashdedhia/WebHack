const form = document.getElementById('breakdown-form');
const breakdownContainer = document.getElementById('breakdown-container');
let checkedItems = []; // Track checked checkboxes

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const assignmentName = document.getElementById('assignment-name').value;
  const dueDate = document.getElementById('due-date').value;
  const pdfFile = document.getElementById('pdf-file').files[0]; // Assuming single file

  // Simulate API call (replace with actual fetch request)
  const simulatedBreakdown = [ // Sample breakdown data
    'Step 1: Read the assignment instructions carefully.',
    'Step 2: Gather all necessary materials and resources.',
    'Step 3: Break down the assignment into smaller tasks.',
    'Step 4: Work on each task one by one, focusing on completing them thoroughly.',
    'Step 5: Review your work and ensure it meets all the assignment requirements.',
    'Step 6: Submit your assignment on time.',
  ];

  // Update UI with breakdown data
  updateBreakdown(simulatedBreakdown);
});

function updateBreakdown(breakdownData) {
  breakdownContainer.innerHTML = ''; // Clear existing content

  const breakdownList = document.createElement('ul');
  breakdownData.forEach((step, index) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `step-${index}`;
    checkbox.value = step;
    checkbox.addEventListener('change', handleCheckboxChange); // Handle checkbox changes

    const label = document.createElement('label');
    label.htmlFor = `step-${index}`;
    label.textContent = step;

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    breakdownList.appendChild(listItem);
  });

  const progressBar = document.createElement('div');
  progressBar.classList.add('progress-bar');
  const progress = document.createElement('div');
  progress.classList.add('progress');
  progressBar.appendChild(progress);

  breakdownContainer.appendChild(breakdownList);
  breakdownContainer.appendChild(progressBar);

  updateProgress(); // Update progress bar initially
}

function handleCheckboxChange(event) {
  if (event.target.checked) {
    checkedItems.push(event.target.value);
  } else {
    checkedItems = checkedItems.filter((item) => item !== event.target.value);
  }
  updateProgress();
}

function updateProgress() {
  const progressElement = breakdownContainer.querySelector('.progress');
  const progressPercentage = Math.floor((checkedItems.length / simulatedBreakdown.length) * 100);
  progressElement.style.width = `${progressPercentage}%`;
}
