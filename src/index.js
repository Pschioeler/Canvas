import { Assignment, loadAssignmentsFromLocalStorage, updateAssignmentMessages, $, assignments } from "./assignments.js";

let a = loadAssignmentsFromLocalStorage("assignments");

function splice(assignments) {
    const container = $("assignmentWrapper");
    container.innerHTML = "";

    // Sort assignments by dueDate in ascending order
    assignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    // Slice the array to get the three assignments due soonest
    const soonestAssignments = assignments.slice(0, 3);

    soonestAssignments.forEach((assignmentData, index) => {
        const assignmentElement = document.createElement('div');
        assignmentElement.classList.add('assignment');
        assignmentElement.innerHTML = `
            <h2 class="assignmentTitle">${assignmentData.title}</h2>
            <p class="assignmentDescription">${assignmentData.description}</p>
            <p class="dueDate">Due Date: ${assignmentData.dueDate}</p>
        `;
        container.appendChild(assignmentElement);
    });
}
splice(a);