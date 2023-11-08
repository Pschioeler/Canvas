class Assignment {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
    }
}

// Check if assignments exist in local storage and load them if yes, initialize an empty array if not
function loadAssignmentsFromLocalStorage(x) { 
    const storedAssignments = localStorage.getItem(x);
    return storedAssignments ? JSON.parse(storedAssignments) : [];
}
//Dynamically checks if there is assignments due or previously and displays a message accordingly
function updateAssignmentMessages() {
    let assignmentError = $("assignmentError");
    let archiveError = $("archiveError");
    
    if (assignments.length === 0) {
        assignmentError.innerHTML = "No due assignments.";
    } else {
        assignmentError.innerHTML = "";
    }
    
    if (assignmentArchive.length === 0) {
        archiveError.innerHTML = "No previous assignments.";
    } else {
        archiveError.innerHTML = "";
    }
}

//Function to quickly grab elements from HTML
function $(id) {
    return document.getElementById(id);
}

let assignments = loadAssignmentsFromLocalStorage("assignments");
let assignmentArchive = loadAssignmentsFromLocalStorage("assignmentArchive");
let assignmentWrapper = $("assignmentWrapper");
let viewForm = $("openForm");
viewForm.addEventListener("click", showForm);

updateAssignmentMessages();

function addAssignment(title, desc, due) {
    let a = new Assignment(title, desc, due);
    assignments.push(a);
    saveDataToLocalStorage();
    addAssignmentsToContainer(assignments);
    updateAssignmentMessages();
}

function showForm() {
    const wrapper = $("formWrapper");
    wrapper.innerHTML = "";

    const form = document.createElement("div");
    form.classList.add("form");
    form.innerHTML = `
        <form id="assignmentForm">
        <label for="title">Add Assignment Title</label>
        <input id="assignmentTitle" name="title" type="text">
        <label>Add Assignment Description</label>
        <textarea id="assignmentDesc" rows="4" cols="50"></textarea>
        <label for="date">Add Due Date</label>
        <input id="assignmentDue" type="datetime-local">
        <button id="addAssignment">Assign</button>
        </form>
    `;
    wrapper.appendChild(form);

    let titleInput = $("assignmentTitle");
    let descInput = $("assignmentDesc");
    let dueInput = $("assignmentDue");
    let addAssignmentButton = $("addAssignment");

    addAssignmentButton.addEventListener("click", function(event) {
        event.preventDefault();
        let title = titleInput.value;
        let desc = descInput.value;
        let due = dueInput.value;
        addAssignment(title, desc, due);
        form.remove();
    });
}

function addAssignmentsToContainer(assignments) {
    const container = $("assignmentWrapper");
    container.innerHTML = "";
    
    assignments.forEach((assignmentData, index) => {
        const assignmentElement = document.createElement('div');
        assignmentElement.classList.add('assignment');
        assignmentElement.innerHTML = `
            <h2 class="assignmentTitle">${assignmentData.title}</h2>
            <p class="assignmentDescription">${assignmentData.description}</p>
            <p class="dueDate">Due Date: ${assignmentData.dueDate}</p>
            <button class="uploadButton" data-index="${index}">Upload Solution</button>
        `;
        container.appendChild(assignmentElement);
    });

    // Add event listeners to the "Upload Solution" buttons
    const uploadButtons = document.querySelectorAll('.uploadButton');
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

        dialog.remove();
        archiveError.innerHTML ="";

        // Save assignmentArchive and updated assignments to local storage
        saveDataToLocalStorage();

        // Update the assignments displayed on the page
        addAssignmentsToContainer(assignments);
        displayArchivedAssignments();
        updateAssignmentMessages();
    });
}
function displayArchivedAssignments() {
    const archiveWrapper = document.getElementById('archiveWrapper');
    archiveWrapper.innerHTML = ''; 

    assignmentArchive.forEach((archiveData, index) => {
        const archiveElement = document.createElement('div');
        archiveElement.classList.add('archiveAssignment');
        archiveElement.innerHTML = `
            <h3 class="archiveTitle">${archiveData.assignment.title}</h3>
            <p class="archiveDescription">${archiveData.assignment.description}</p>
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

export { Assignment, loadAssignmentsFromLocalStorage, updateAssignmentMessages, $, assignments };