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
  // document.querySelector("#upload-button").addEventListener("click", uploadFile)
  document.querySelector("#upload-button").addEventListener("click", pleaseDoBoth);
  
  
  //Size radio buttons
  document.querySelectorAll('input[name="size"]').forEach(radioButtonInput => {
    radioButtonInput.addEventListener("click", () => {
      
      //reset the span on input to Choose file
      reset();
      deleteFiles();
      // draggedFiles = [];
      // console.log(draggedFiles);

      value = radioButtonInput.getAttribute("value");
      document.querySelector("#preview").classList.add("displayNone");
      document.querySelector("#animations-container").classList.add("displayNone");
      document.querySelector("#upload-button").classList.add("displayNone");
      document.querySelector("#download").classList.add("displayNone");
      document.querySelector("#reset").classList.add("displayNone");
      if (value === '300x250' || value === '300x600' || value === '320x320') {
        console.log("portrait");
        console.log(value);
        document.querySelector("#wrapper").classList.add("wrapper");
        document.querySelector("#upload").classList.add("width50");
        document.querySelector("#assetswrapper").classList.add("portrait");
        document.querySelector("#assetswrapper").classList.remove("landscape");
        document.querySelectorAll(".asset").forEach(function (asset) {
          asset.classList.add("assetPortrait");
        })
      } else {
        console.log(value);
        document.querySelector("#wrapper").classList.remove("wrapper");
        document.querySelector("#upload").classList.remove("width50");
        document.querySelector("#assetswrapper").classList.remove("portrait");
        document.querySelector("#assetswrapper").classList.add("landscape");
        document.querySelectorAll(".asset").forEach(function (asset) {
          asset.classList.remove("assetPortrait");
        })
      }
      document.querySelector("#wrapper").classList.remove("displayNone");
    })
  })


//drag and drop upload
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

// const draggedFiles = []
function handleDrop(e) {
  input = e.currentTarget.querySelector(".fileupload");
  inputName = input.getAttribute('name');

  // files: from FileList into Array
  let files = [...e.dataTransfer.files];
  const file = files[0]
  
  const draggedFile = {
    'name': inputName,
    'file': file
  }
  console.log('file: ', draggedFile);

  //Change the label of the input
  document.querySelector("#upload-button").classList.remove("displayNone");
  const fileName = files[0].name;
  updateFileInput(input, fileName, reset);

  
  

  draggedFiles.forEach((draggo, index) => {
    const isTheSame = (draggo.name === inputName)
    console.log(isTheSame, index);
    if (isTheSame) {
      draggedFiles.splice(index, 1, draggedFile)
    } else {
      draggedFiles.push(draggedFile)
    }
  });

  if (draggedFiles.length === 0) {
    draggedFiles.push(draggedFile)
  }
  // console.log(draggo);
  // draggedFiles.push(draggedFile)
  console.log('Array: ', draggedFiles);

}

function pleaseDoBoth() {
  uploadDraggedFiles();
  uploadFile()
}

async function uploadDraggedFiles() {
  let formData = new FormData();

  draggedFiles.forEach(fileObject => {
    formData.append(fileObject.name, fileObject.file);
  })


   
  const response = await fetch(`/profile-upload-single/size/${value}`, {
    method: "POST", 
    body: formData
  }); 
  
  if (response.status === 200) {
    // console.log("success");
  }
}


  //Get filename and update label
  Array.prototype.forEach.call(inputs, function (input) {
    input.addEventListener('change', function(e) {
      console.log(e.target.value);
      const fileName = e.target.value.split("\\").pop();
      document.querySelector("#upload-button").classList.remove("displayNone");
  
      updateFileInput(input, fileName, false);
    })
  })


  document.querySelector("#resetButton").addEventListener("click", deleteFiles);

  document.querySelectorAll(".animationBtn").forEach(animationButton => {
    animationButton.addEventListener('click', () => {
      animation = animationButton.getAttribute("id");
      applyAnim();
    })
  })
  
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





function updateFileInput(input, fileName, reset) {
  const label = input.nextElementSibling;
  label.querySelector('span').innerHTML = fileName;
  if (reset) input.value = '';
}

function reset() {
  draggedFiles = [];
  console.log(draggedFiles);
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


//Route triggers
async function uploadFile() {
  let formData = new FormData();          
  formData.append("bg", fileupload.files[0]);
  formData.append("txt_1", fileupload2.files[0]);
  formData.append("txt_2", fileupload3.files[0]);
  formData.append("cta", fileupload4.files[0]);
  
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

async function deleteFiles() {
  const response = await fetch(`/delete-files`)
}

async function applyAnim() {
  const response = await fetch(`/animations/${animation}`);
  document.querySelector(".preview").src = `${value}/${value}.html`;
}


