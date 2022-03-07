document.querySelector("#upload-button").addEventListener("click", uploadFile);


async function uploadFile() {
    console.log("test");
    let formData = new FormData();    
    // console.log(fileupload)            
    formData.append("bg", fileupload.files[0]);
    formData.append("txt_1", fileupload2.files[0]);
    formData.append("txt_2", fileupload3.files[0]);
    formData.append("cta", fileupload4.files[0]);

    await fetch('/profile-upload-single', {
      method: "POST", 
      body: formData
    });    
    console.log("test passed");
}
