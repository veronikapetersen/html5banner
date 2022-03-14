document.querySelectorAll('input[name="size"]').forEach(size => {
  size.addEventListener("click", () => {
    value= size.getAttribute("value");
    console.log(value);
    loadHtml();
  })
})

function loadHtml() {
  document.querySelector(".preview").src = `${value}/${value}.html`;
  const dimensions = value.split('x');
  document.querySelector(".preview").width = dimensions[0];
  document.querySelector(".preview").height = dimensions[1];
}

var inputs = document.querySelectorAll('.fileupload');
Array.prototype.forEach.call(inputs, function (input) {
  var label = input.nextElementSibling,
  labelVal = label.innerHTML;

  input.addEventListener('change', function(e)
  {
    var fileName = '';
    fileName = e.target.value.split("\\").pop();
    if (fileName) 
    label.querySelector('span').innerHTML = fileName;
  })
})

document.querySelector("#upload-button").addEventListener("click", uploadFile);

async function uploadFile() {
    // console.log("test");
    let formData = new FormData();    
    console.log(fileupload)            
    // formData.append("temp", "folder");
    formData.append("bg", fileupload.files[0]);
    formData.append("txt_1", fileupload2.files[0]);
    formData.append("txt_2", fileupload3.files[0]);
    formData.append("cta", fileupload4.files[0]);

    const response = await fetch(`/profile-upload-single/size/${value}`, {
      method: "POST", 
      body: formData
    });   
    if (response.status === 200) {
      // console.log("files uploaded");
      // console.log(document.querySelector(".preview"));
      // document.querySelector(".preview").src = "300x600.html";
    }
}

