fetch(`/delete-files`)

var inputs = document.querySelectorAll('.fileupload');
document.querySelector("#upload-button").addEventListener("click", uploadFile);


document.querySelectorAll('input[name="size"]').forEach(radioButtonInput => {
  radioButtonInput.addEventListener("click", () => {
    
    //reset the span on input to Choose file
    reset();

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
    document.querySelector("#animations-container").classList.remove("displayNone");
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

async function applyAnim() {
  const response = await fetch(`/animations/${animation}`);
  document.querySelector(".preview").src = `${value}/${value}.html`;
}


document.querySelectorAll(".animationBtn").forEach(animationButton => {
  animationButton.addEventListener('click', () => {
    animation = animationButton.getAttribute("id");


    console.log("selected animation is", animation);
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
    console.log("hey");
  } else {
    alert("The <dialog> API is not supported by this browser");
  }
});

favDialog.addEventListener('close', function onClose() {
  window.location.reload();
  console.log("page reloaded");
});