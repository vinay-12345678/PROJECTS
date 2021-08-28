let photoDiv=document.querySelector("#photo");
let photoUpload=document.querySelector("#photo-upload");
let downloadDiv=document.querySelector("#download");



photoDiv.addEventListener("click",function () {
  photoUpload.click();  
});
photoUpload.addEventListener("change",function (event) {
    console.log(event);
    let fileObj=event.target.files[0];
    console.log(fileObj);
     let filePath=URL.createObjectURL(fileObj);
     console.log(filePath);
     let img=document.createElement("img");
     img.setAttribute("src",filePath);
     img.classList.add("sticky-image");
     addSticky(img);
});
downloadDiv.addEventListener("click",function () {
   let imagePath=canvas.toDataURL("image/jpg");
   console.log(imagePath);
   let aTag=document.createElement("a");
   aTag.download="canvas.jpg";
   aTag.href=imagePath;
   aTag.click(); 
})