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


  // if (value==="300x250") {
  //   document.querySelector(".preview").src = `${value}/${value}.html`;
  //   document.querySelector(".preview").height = "250";
  // } else if (value === "300x600") {
  //   document.querySelector(".preview").src = "300x600/300x600.html";
  //   document.querySelector(".preview").width = "300";
  //   document.querySelector(".preview").height = "600";
  // } else if (value === "320x320") {
  //   document.querySelector(".preview").src = "320x320/320x320.html";
  //   document.querySelector(".preview").width = "320";
  //   document.querySelector(".preview").height = "320";
  // } else if (value === "930x180") {
  //   document.querySelector(".preview").src = "930x180/930x180.html";
  //   document.querySelector(".preview").width = "930";
  //   document.querySelector(".preview").height = "180";
  // } else if (value === "930x600") {
  //   document.querySelector(".preview").src = "930x600/930x600.html";
  //   document.querySelector(".preview").width = "930";
  //   document.querySelector(".preview").height = "600";
  // }
}

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


// var sizes = document.querySelectorAll('input[name="size"]');
// console.log(sizes);
// // document.querySelectorAll('input[name="size"]').forEach.addEventListener("click", selectSize);
// sizes.forEach(size => {
//  size.addEventListener("click", showValue());
// });
