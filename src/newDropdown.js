// Add new dropdown
function createDropdown2() {
    const dropdownContainer = document.getElementById('dropdown-container');

    // Prompt the user for the dropdown name
    // if user cancels return
    const dropdownName = prompt("Enter a name for the dropdown:");
    if (!dropdownName) return;

    // Create a new dropdown box
    const newDropdown = document.createElement('div');
    newDropdown.classList.add('dropdown-box');
    newDropdown.onclick = function() { toggleDropdown(this); };

     // Add content to the new dropdown
     newDropdown.innerHTML = `
    <span class="dropdownName">${dropdownName}</span>
    <div class="dropdown-content"></div>
    <input class="input" type="file" style="display: none;">
    <button class="addFileBtn">Add File</button>
    `;
    dropdownContainer.appendChild(newDropdown); 

    //const fileInput = document.getElementsByClassName("input");
    const fileInput = newDropdown.querySelector(".input");
    const addFileButton = newDropdown.querySelector(".addFileBtn");
    //const dropdownContent = newDropdown.querySelector('dropdown-content');

    fileInput.onchange = function() { addFileToDropdown(this, newDropdown); };

    addFileButton.addEventListener('click', function() {
        fileInput.click();
    });

    // Append the new dropbox to the container
    //dropdownContainer.appendChild(newDropdown);    
}


// Add a file to the dropdown list
function addFileToDropdown(fileInput, newDropdown) {
    const fileList = fileInput.files;
    if (fileList.length > 0) {
      const fileName = fileList[0].name;

      // Find the dropdown-content element inside the newDropdown
      const dropdownContent = newDropdown.querySelector('.dropdown-content');

      // Create a new item with a remove button
      const newItem = document.createElement("div");
      newItem.className = "item";
      newItem.innerHTML = `
        <a href="#" title="${fileName}" onclick="downloadFile(this)">${fileName}</a>
        <button class="remove-button" onclick="removeItem(this)">Remove</button>
      `;
       dropdownContent.appendChild(newItem);

      // Clear the file input
      fileInput.value = null;
    }
  }

  // toggle the dropdown
  function toggleDropdown(dropdown) {
    dropdown.classList.toggle("active");

    /*
    // Find the dropdown-content element inside the newDropdown
    const ddContent = dropdown.querySelector('.dropdown-content');

    if(dropdown.classList.contains("active")) {
      ddContent.classList.add("active");
    } else {
        ddContent.classList.remove("active");
    }
*/
  }

  // download the file
  function downloadFile(element) {
    const fileName = element.getAttribute("title");
    const dataURL = "data:application/octet-stream," + encodeURIComponent("Sample file content");
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  // remove an item from the dropdown list
  function removeItem(button) {
    const item = button.parentElement;
    item.parentElement.removeChild(item);
  }

// Add a click event listener to the "Add dropdown" button
document.getElementById('add-dropdown').addEventListener('click', createDropdown2);