class Assignment {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
    }
}
// Check if assignments exist in local storage and load them if yes, initialize and empty array if not
let assignments = loadAssignmentsFromLocalStorage("assignments");
let assignmentArchive = loadAssignmentsFromLocalStorage("assignmentArchive");

function loadAssignmentsFromLocalStorage(x) {
    const storedAssignments = localStorage.getItem(x);
    return storedAssignments ? JSON.parse(storedAssignments) : [];
}

//Function to quickly grab elements from HTML
function $(id) {
    return document.getElementById(id);
}
let titleInput = $("assignmentTitle");
let descInput = $("assignmentDesc");
let dueInput = $("assignmentDue");
let addAssignmentButton = $("addAssignment");
let assignmentWrapper = $("assignmentWrapper");

addAssignmentButton.addEventListener("click", function(event) {
    event.preventDefault();
    let title = titleInput.value;
    let desc = descInput.value;
    let due = dueInput.value;
    addAssignment(title, desc, due);
});

function addAssignment(title, desc, due) {
    let a = new Assignment(title, desc, due);
    assignments.push(a);
    // Save assignments and assignmentArchive to local storage
    saveDataToLocalStorage();
    // Update the assignments displayed on the page
    addAssignmentsToContainer(assignments);
}

// Function to create and add assignments to the container
function addAssignmentsToContainer(assignments) {
    const container = document.getElementById('assignmentWrapper');
    container.innerHTML = '';

    assignments.forEach((assignmentData, index) => {
        const assignmentElement = document.createElement('div');
        assignmentElement.classList.add('assignment');
        assignmentElement.innerHTML = `
            <h2 class="title">${assignmentData.title}</h2>
            <p class="description">${assignmentData.description}</p>
            <p class="due-date">Due Date: ${assignmentData.dueDate}</p>
            <button class="upload-solution-button" data-index="${index}">Upload Solution</button>
        `;

        container.appendChild(assignmentElement);
    });

    // Add event listeners to the "Upload Solution" buttons
    const uploadButtons = document.querySelectorAll('.upload-solution-button');
    uploadButtons.forEach(button => {
        button.addEventListener('click', openUploadDialog);
    });
}

function openUploadDialog(event) {
    const index = event.target.getAttribute('data-index');
    const assignment = assignments[index];

    // Create a dialog to upload a solution
    const dialog = document.createElement('div');
    dialog.classList.add('upload-dialog');
    dialog.innerHTML = `
        <h3>Upload Solution for ${assignment.title}</h3>
        <input type="file" id="solutionFile" accept=".pdf, .doc, .docx" required>
        <textarea id="solutionComment" placeholder="Optional Comment"></textarea>
        <button id="uploadSolution">Upload</button>
    `;

    document.body.appendChild(dialog);

    const uploadButton = dialog.querySelector('#uploadSolution');
    uploadButton.addEventListener('click', () => {
        const solutionFile = dialog.querySelector('#solutionFile').files[0];
        const solutionFileName = solutionFile ? solutionFile.name : '';
        const solutionComment = dialog.querySelector('#solutionComment').value;

        // Check if a file is selected
        if (!solutionFile) {
            alert('Please select a file.');
            return;
        }

        // Add the solution and comment to the assignmentArchive array
        assignmentArchive.push({
            assignment: assignment,
            solutionFile: solutionFile,
            solutionFileName: solutionFileName,
            solutionComment: solutionComment,
            
        });

        // Remove the assignment from the assignments array
        assignments.splice(index, 1);

        // Close the dialog
        dialog.remove();

        // Save assignmentArchive and updated assignments to local storage
        saveDataToLocalStorage();

        // Update the assignments displayed on the page
        addAssignmentsToContainer(assignments);
        displayArchivedAssignments();
    });
}
function displayArchivedAssignments() {
    const archiveWrapper = document.getElementById('archiveWrapper');
    archiveWrapper.innerHTML = ''; // Clear the contents of the archiveWrapper

    assignmentArchive.forEach((archiveData, index) => {
        const archiveElement = document.createElement('div');
        archiveElement.classList.add('archive-assignment');
        archiveElement.innerHTML = `
            <h3>${archiveData.assignment.title}</h3>
            <p>${archiveData.assignment.description}</p>
            <p>File Name: ${archiveData.solutionFileName}</p>
        `;

        archiveWrapper.appendChild(archiveElement);
    });
}

// Save assignments and assignmentArchive to local storage
function saveDataToLocalStorage() {
    localStorage.setItem('assignments', JSON.stringify(assignments));
    localStorage.setItem('assignmentArchive', JSON.stringify(assignmentArchive));
}



// Initial loading of assignments from local storage
addAssignmentsToContainer(assignments);
displayArchivedAssignments();