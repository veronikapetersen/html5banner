var inputs = document.querySelectorAll('.fileupload');
let input;
let draggedFiles = [];
function init() {
  fetch(`/delete-files`)
  createEventListeners()
}
init();

function createEventListeners() {
  //File upload
  document.querySelector("#upload-button").addEventListener("click", uploadFiles);
  
  
  //Size radio buttons
  document.querySelectorAll('input[name="size"]').forEach(radioButtonInput => {
    radioButtonInput.addEventListener("click", () => {
      
      //reset the span on input to Choose file
      reset();
      deleteFiles();

      value = radioButtonInput.getAttribute("value");
      document.querySelector("#preview").classList.add("displayNone");
      document.querySelector("#animations-container").classList.add("displayNone");
      document.querySelector("#upload-button").classList.add("displayNone");
      document.querySelector("#download").classList.add("displayNone");
      document.querySelector("#reset").classList.add("displayNone");
      document.querySelector("#wrapper").classList.remove("displayNone");
    })
  })

  //Get filename and update label
  Array.prototype.forEach.call(inputs, function (input) {
    input.addEventListener('change', function(e) {
      // const fileName = e.target.value.split("\\").pop();
      document.querySelector("#upload-button").classList.remove("displayNone");
      handleSelect(e);
      // updateFileInput(input, fileName, false);
    })
  })

  document.querySelector("#resetButton").addEventListener("click", deleteFiles);

  document.querySelectorAll(".animationBtn").forEach(animationButton => {
    animationButton.addEventListener('click', () => {
      animation = animationButton.getAttribute("id");
      applyAnim();
    })
  })

  document.querySelector("#noAnim").addEventListener("click", noAnim);
  
  document.querySelector("#replayAnimBtn").addEventListener("click", () => {
    document.querySelector(".preview").contentWindow.location.reload();
  })
  
  const favDialog = document.querySelector("#dialog");
  document.querySelector(".downloadButton").addEventListener('click', function onOpen() {
    if (typeof favDialog.showModal === "function") {
      favDialog.showModal();
    } else {
      alert("The <dialog> API is not supported by this browser");
    }
  });
  
  favDialog.addEventListener('close', () => window.location.reload());
}

//"Drag & Drop" upload
document.querySelectorAll(".asset").forEach(dropArea => {
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
  });

  function highlight(e) {dropArea.classList.add('highlight')};
  
  function unhighlight(e) {dropArea.classList.remove('highlight')};

  dropArea.addEventListener('drop', handleDrop, false);
})

function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
};

function handleDrop(e) {
  input = e.currentTarget.querySelector(".fileupload");
  newFileName = input.getAttribute('name');
  // files: from FileList to Array
  let files = [...e.dataTransfer.files];
  const file = files[0]
  const newFileObj = {
    'name': newFileName,
    'file': file
  }

  //Change the label of the input
  document.querySelector("#upload-button").classList.remove("displayNone");
  const fileName = files[0].name;
  updateFileInput(input, fileName, true);
  addDraggedFiletoArray(newFileObj);
}

//"Select File" upload
function handleSelect(e) {
  const originalFileName = e.target.value.split("\\").pop();
  let selectedInput = e.currentTarget;
  let addedFile = selectedInput.files[0];
  const file = addedFile;
  let newFileName = selectedInput.getAttribute('name');
  const newFileObj = {
    'name': newFileName,
    'file': file
  }
  
  updateFileInput(selectedInput, originalFileName, true);
  addDraggedFiletoArray(newFileObj);
}

function addDraggedFiletoArray(newFileObj) {
    const index = draggedFiles.findIndex(arrayItem => arrayItem.name === newFileObj.name)
    console.log(index);
    if (index === -1) draggedFiles.push(newFileObj)
    else draggedFiles.splice(index, 1, newFileObj)
    console.log('Array: ', draggedFiles);
}


async function uploadFiles() {
  let formData = new FormData();
  
  draggedFiles.forEach(fileObject => {
    formData.append(fileObject.name, fileObject.file);
  })
  
  const response = await fetch(`/profile-upload-single/size/${value}`, {
    method: "POST", 
    body: formData
  });

  if (response.status === 200) {
    document.querySelector("#preview").classList.remove("displayNone");
    document.querySelector("#animations-container").classList.remove("displayNone");
    loadHtml();
  }
}

function updateFileInput(input, fileName, reset) {
  const label = input.nextElementSibling;
  label.querySelector('span').innerHTML = fileName;
  if (reset) input.value = '';
}

function reset() {
  draggedFiles = [];
  Array.prototype.forEach.call(inputs, function (input) {
    updateFileInput(input, 'Choose file', true)
  })
}

function loadHtml() {
  document.querySelector(".preview").src = `${value}/${value}.html`;
  const dimensions = value.split('x');
  document.querySelector(".preview").width = dimensions[0];
  document.querySelector(".preview").height = dimensions[1];
  document.querySelector("#download").classList.remove("displayNone");
}

async function deleteFiles() {
  await fetch(`/delete-files`)
}

async function applyAnim() {
  await fetch(`/animations/${animation}`);
  document.querySelector(".preview").src = `${value}/${value}.html`;
}

async function noAnim() {
  console.log("no anim");
  await fetch(`/noanim`);
  // document.querySelector(".preview").src = `${value}/${value}.html`;
}