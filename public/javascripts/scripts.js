var inputs = document.querySelectorAll('.fileupload');
document.querySelector("#upload-button").addEventListener("click", uploadFile);


document.querySelectorAll('input[name="size"]').forEach(size => {
  size.addEventListener("click", () => {
    
    //reset the span on input to Choose file
    reset();

    value= size.getAttribute("value");
    document.querySelector("#preview").classList.add("displayNone");
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
      console.log("landscape");
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

Array.prototype.forEach.call(inputs, function (input) {
  input.addEventListener('change', function(e) {
    const fileName = e.target.value.split("\\").pop();
    document.querySelector("#upload-button").classList.remove("displayNone");

    updateFileInput(input, fileName, false)
  })
})

function updateFileInput(input, fileName, reset) {
  const label = input.nextElementSibling;
  label.querySelector('span').innerHTML = fileName;
  if (reset) input.value = '';
}

function reset() {
  Array.prototype.forEach.call(inputs, function (input) {
    updateFileInput(input, 'Choose file', true)
  })
  //remove upload & download & preview & delete files
}

async function uploadFile() {
  let formData = new FormData();    
  console.log(fileupload)            
  formData.append("bg", fileupload.files[0]);
  formData.append("txt_1", fileupload2.files[0]);
  formData.append("txt_2", fileupload3.files[0]);
  formData.append("cta", fileupload4.files[0]);

  console.log(value);
  
  const response = await fetch(`/profile-upload-single/size/${value}`, {
    method: "POST", 
    body: formData
  }); 
  
  if (response.status === 200) {
    document.querySelector("#preview").classList.remove("displayNone");
    loadHtml();
  }
}

function loadHtml() {
  document.querySelector(".preview").src = `${value}/${value}.html`;
  const dimensions = value.split('x');
  document.querySelector(".preview").width = dimensions[0];
  document.querySelector(".preview").height = dimensions[1];
  showDownloadBtn();
  showResetBtn();
}

function showDownloadBtn() {
  document.querySelector("#download").classList.remove("displayNone");
}

function showResetBtn() {
  document.querySelector("#reset").classList.remove("displayNone");
}

document.querySelector("#resetButton").addEventListener("click", deleteFiles);
async function deleteFiles() {
  const response = await fetch(`/delete-files`)
}


// const dropAreaList = document.querySelectorAll(".asset");

// Array.prototype.forEach.call(dropAreaList, function (dropArea) {
//   dropArea.addEventListener("drag", function dragOverHandler(ev) {
//     console.log(dropArea.length);
//     ev.preventDefault();
//   })
//   dropArea.addEventListener("drop", function dropHandler(ev) {
//     console.log(dropArea.length);
//     ev.preventDefault();
//   })
//   // dropArea.addEventListener("ondrag", dragOverHandler);
//   // dropArea.addEventListener("ondrop", dropHandler);
// })


// function dragOverHandler(ev) {
//   console.log('File(s) in drop zone');
//   // Prevent default behavior (Prevent file from being opened)
//   ev.preventDefault();
// }

// //drag and drop files upload
// function dropHandler(ev) {
//   console.log('File(s) dropped');

//   // Prevent default behavior (Prevent file from being opened)
//   ev.preventDefault();

//   if (ev.dataTransfer.items) {
//     // Use DataTransferItemList interface to access the file(s)
//     for (var i = 0; i < ev.dataTransfer.items.length; i++) {
//       // If dropped items aren't files, reject them
//       if (ev.dataTransfer.items[i].kind === 'file') {
//         var file = ev.dataTransfer.items[i].getAsFile();
//         console.log('... file[' + i + '].name = ' + file.name);
//       }
//     }
//   } else {
//     // Use DataTransfer interface to access the file(s)
//     for (var i = 0; i < ev.dataTransfer.files.length; i++) {
//       console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
//     }
//     updateFileInput(input, fileName, false)
//   }
// }

