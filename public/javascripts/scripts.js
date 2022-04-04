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
  // document.querySelector("#upload-button").addEventListener("click", pleaseDoBoth);
  document.querySelector("#upload-button").addEventListener("click", uploadDraggedFiles);
  
  
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
        // console.log("portrait");
        // console.log(value);
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


  //Get filename and update label
  Array.prototype.forEach.call(inputs, function (input) {
  
    input.addEventListener('change', function(e) {
      const fileName = e.target.value.split("\\").pop();
      document.querySelector("#upload-button").classList.remove("displayNone");

      handleSelect(e);

      updateFileInput(input, fileName, false);
    })

    // console.log(input.name, input.files[0]);
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

function handleSelect(e) {
  
  // get the id of the target input tag
  let selectedInput = e.currentTarget;
  // console.log(selectedInput);
  // let inputID = selectedInput.getAttribute("id");
  // console.log('id of the selected input is ', inputID);
  //get the files array of the targeted input
  // and define one file as files[0]
  let addedFile = selectedInput.files[0];
  const file = addedFile;
  
  // console.log("file: ", addedFile);
  
  let newFileName = selectedInput.getAttribute('name');

  const newFileObj = {
    'name': newFileName,
    'file': file
  }
  // console.log(draggedFile);
  addDraggedFiletoArray(newFileObj);
}

function handleDrop(e) {
  // input = e.currentTarget.querySelector(".fileupload");
  //currentTarget is the parent that has the event listener on it - 
  // in our case it's the .asset which is also defined as dropArea 
  input = e.currentTarget.querySelector(".fileupload");
  // let inputID = e.currentTarget.querySelector(".fileupload").getAttribute("id");
  // console.log(inputID);
  newFileName = input.getAttribute('name');

  // files: from FileList into Array
  let files = [...e.dataTransfer.files];
  const file = files[0]
  
 const newFileObj = {
    'name': newFileName,
    'file': file
  }
  // console.log('file: ', draggedFile);

  //Change the label of the input
  document.querySelector("#upload-button").classList.remove("displayNone");
  const fileName = files[0].name;
  updateFileInput(input, fileName, reset);

  
  addDraggedFiletoArray(newFileObj);

}


function addDraggedFiletoArray(newFileObj) {

    // draggedFiles.forEach((arrrayItem, index) => {
    //   const isTheSame = (arrrayItem.name === newFileObj.name)
    //   // console.log(isTheSame, index);
    //   if (isTheSame) {
    //     console.log(index, "name is the same")
    //     draggedFiles.splice(index, 1, newFileObj)
    //   } else {
    //     console.log(index, "name is not the same")
    //     draggedFiles.push(newFileObj)
    //   }
    // });
    const index = draggedFiles.findIndex(arrayItem => arrayItem.name === newFileObj.name)
    console.log(index);

    if (index === -1) draggedFiles.push(newFileObj)
    else draggedFiles.splice(index, 1, newFileObj)

  
    // if (draggedFiles.length === 0) {
    //   console.log("no files in the array, so pushing the new file object")
    //   draggedFiles.push(newFileObj)
    // }
    console.log('Array: ', draggedFiles);
  
}


// async function pleaseDoBoth() {
//   // await uploadDraggedFiles();
//   // await uploadFile()
  
//   await upload()

//   document.querySelector("#preview").classList.remove("displayNone");
//   document.querySelector("#animations-container").classList.remove("displayNone");
//   loadHtml();
// }


async function upload() {
  let fileObjName
  let fileObjFile
  Array.prototype.forEach.call(inputs, function (input) {
    console.log(input.name, input.value);
    console.log(draggedFiles); 
  })

  console.log(fileupload.files[0]);
  let formData = new FormData();
  formData.append(fileObjName, fileObjFile);
  formData.append(fileObjName, fileObjFile);
  formData.append(fileObjName, fileObjFile);
  formData.append(fileObjName, fileObjFile);
  // formData.append(fileObjName || 'bg', fileupload.files[0] || fileObjFile);
  // formData.append(fileObjName || 'txt_1', fileupload2.files[0] || fileObjFile);
  // formData.append(fileObjName || 'txt_2', fileupload3.files[0] || fileObjFile);
  // formData.append(fileObjName || 'cta', fileupload4.files[0] || fileObjFile);
  // formData.append("txt_1", fileupload2.files[0]);
  // formData.append("txt_2", fileupload3.files[0]);
  // formData.append("cta", fileupload4.files[0]);
  const response = await fetch(`/profile-upload-single/size/${value}`, {
    method: "POST", 
    body: formData
  });


  document.querySelector("#preview").classList.remove("displayNone");
  document.querySelector("#animations-container").classList.remove("displayNone");
  loadHtml();

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
  const response = await fetch(`/delete-files`)
}

async function applyAnim() {
  const response = await fetch(`/animations/${animation}`);
  document.querySelector(".preview").src = `${value}/${value}.html`;
}


