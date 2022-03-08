document.querySelector("#upload-button").addEventListener("click", uploadFile);


async function uploadFile() {
    console.log("test");
    let formData = new FormData();    
    console.log(fileupload)            
    formData.append("bg", fileupload.files[0]);
    formData.append("txt_1", fileupload2.files[0]);
    formData.append("txt_2", fileupload3.files[0]);
    formData.append("cta", fileupload4.files[0]);

    const response = await fetch('/profile-upload-single', {
      method: "POST", 
      body: formData
    });   
    if (response.status === 200) {
      // console.log(document.querySelector(".preview"));
      document.querySelector(".preview").src = "300x600.html";
    }
}


// var sizes = document.querySelectorAll('input[name="size"]');
// console.log(sizes);
// // document.querySelectorAll('input[name="size"]').forEach.addEventListener("click", selectSize);
// sizes.forEach(size => {
//  size.addEventListener("click", showValue());
// });

document.querySelectorAll('input[name="size"]').forEach(size => {
  size.addEventListener("click", () => {
    value= size.getAttribute("value");
    console.log(value);
    loadHtml();
  })
})

function loadHtml() {
  if (value==="300x250") {
    document.querySelector(".preview").src = "300x250/300x250.html";
  } else if (value === "300x600") {
    document.querySelector(".preview").src = "300x600/300x600.html";
  } else if (value === "320x320") {
    document.querySelector(".preview").src = "320x320/320x320.html";
  } else if (value === "930x180") {
    document.querySelector(".preview").src = "930x180/930x180.html";
  } else if (value === "930x600") {
    document.querySelector(".preview").src = "930x600/930x600.html";
  }
}
