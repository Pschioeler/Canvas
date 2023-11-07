   // Function to add a new notification
   function addNotification() {
    const container = document.getElementById('notification-container');

    // Create a new notification box
    const newNotification = document.createElement('div');
    newNotification.classList.add('notification-box');

    // Add the content to the new notification
    newNotification.innerHTML = `
        <img class="removeIcon" src="../assets/img/remove.png" alt="Knap til at fjerne notification">
        <h3>lorem ipsum</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <button class="read-more-button">Læs mere</button>
    `;

    // Append the new notification to the container
    container.appendChild(newNotification);

    // Add a click event listener to remove the notification when the remove icon is clicked
    newNotification.querySelector('.removeIcon').addEventListener('click', () => {
        removeNotification(newNotification);
    });
}

// Function to remove a notification
function removeNotification(notification) {
    const container = document.getElementById('notification-container');
    container.removeChild(notification);
}

// Add a click event listener to the "Add Notification" button
document.getElementById('add-notification').addEventListener('click', addNotification);