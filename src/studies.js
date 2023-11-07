   // Function to create a new subject with a checkbox, file list, and buttons
   function createSubject() {
    const subjectContainer = document.createElement("div");
    subjectContainer.className = "subject";
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "touch";

    const label = document.createElement('label');
    const span = document.createElement('span');
    span.className="span1"
    span.textContent = prompt('Enter subject name:');
    label.appendChild(span);

    const fileList = document.createElement('ul');

    const addFileButton = document.createElement('button');
    addFileButton.textContent = 'Add File';
    addFileButton.addEventListener('click', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.multiple = true;
      fileInput.addEventListener('change', () => {
        for (const file of fileInput.files) {
          const listItem = document.createElement('li');
          listItem.textContent = file.name;

          const removeFileButton = document.createElement('button');
          removeFileButton.textContent = 'Remove';
          removeFileButton.addEventListener('click', () => {
            listItem.remove();
          });

          listItem.appendChild(removeFileButton);
          fileList.appendChild(listItem);
        }
      });
      fileInput.click();
    });

    const removeSubjectButton = document.createElement('button');
    removeSubjectButton.textContent = 'Remove Subject';
    removeSubjectButton.addEventListener('click', () => {
      subjectContainer.remove();
    });

    subjectContainer.appendChild(checkbox);
    subjectContainer.appendChild(label);
    subjectContainer.appendChild(fileList);
    subjectContainer.appendChild(addFileButton);
    subjectContainer.appendChild(removeSubjectButton);

    document.body.appendChild(subjectContainer);
  }

  document.getElementById('addSubjectButton').addEventListener('click', () => {
    createSubject();
  });