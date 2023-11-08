  // JavaScript function to create a new dropdown
  function createDropdown() {
    // Prompt the user for the dropdown name
    const dropdownName = prompt("Enter a name for the dropdown:");
    if (!dropdownName) return; // Handle the case where the user cancels

    const container = document.createElement("div");
    container.className = "dropdown";
    container.onclick = function() { toggleDropdown(this); };

    const span = document.createElement("span");
    span.className = "dropdownName";
    span.textContent = dropdownName;
    container.appendChild(span);

    const dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown-content";
    container.appendChild(dropdownContent);

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";
    fileInput.onchange = function() { addFileToDropdown(this, dropdownContent); };
    container.appendChild(fileInput);

    // Button to add files to the dropdown
    const addButton = document.createElement("button");
    addButton.className = "addFileBtn"
    addButton.textContent = "Add File";
    addButton.onclick = function() {
      fileInput.click();
    };
    container.appendChild(addButton);

    document.body.appendChild(container);
  }

  // JavaScript function to toggle the dropdown
  function toggleDropdown(dropdown) {
    dropdown.classList.toggle("active");
    if (document.getElementById("dropdown").classList.contains('active')) {
        // Calculate the height of the dropdown
        let dropdownHeight = document.getElementById("dropdown active").offsetHeight;
        // Use the height to push down the content
        contentElement.style.transform = `translateY(${dropdownHeight}px)`;
      } else {
        // Reset the content position
        contentElement.style.transform = 'translateY(0px)';
      }
  }

  // JavaScript function to add a file to the dropdown list
  function addFileToDropdown(fileInput, dropdownContent) {
    const fileList = fileInput.files;
    if (fileList.length > 0) {
      const fileName = fileList[0].name;

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

  // JavaScript function to download the file
  function downloadFile(element) {
    const fileName = element.getAttribute("title");
    // You can provide a download link or use Blob URL to initiate the download
    // For simplicity, we'll create a data URL and trigger a download
    const dataURL = "data:application/octet-stream," + encodeURIComponent("Sample file content");
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  // JavaScript function to remove an item from the dropdown list
  function removeItem(button) {
    const item = button.parentElement;
    item.parentElement.removeChild(item);
  }