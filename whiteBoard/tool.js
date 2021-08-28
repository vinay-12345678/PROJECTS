let undo=document.querySelector("#undo");
undo.addEventListener("click", undoLine);
let redo=document.querySelector("#redo");
redo.addEventListener("click" , redoLine);




function undoLine() {
    if(linesDB.length)
    {
        let undoline=linesDB.pop();
        redoLineDB.push(undoline);
        // ctx.clearRect(0,0,canvas.Width,canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 255)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);    
        ctx.stroke();
        drawLinesDB();
    }
}

function redoLine() {
  if(redoLineDB.length){

    let currenLineWidth=ctx.lineWidth;
    let currentStrokeStyle=ctx.strokeStyle;
        let redoline=redoLineDB.pop();
        for(let i=0;i<redoline.length;i++){
             let pointObject=redoline[i];
            if(pointObject.type =="md"){
                ctx.lineWidth=pointObject.lineWidth;
                ctx.strokeStyle=pointObject.strokeStyle;
                ctx.beginPath();
                ctx.moveTo(pointObject.x , pointObject.y);
            }else{
                ctx.lineTo(pointObject.x,pointObject.y);
                ctx.stroke();
            }
              
        }
       linesDB.push(redoline);
       ctx.lineWidth=currenLineWidth;
       ctx.strokeStyle=currentStrokeStyle;
    }
   
}






function drawLinesDB() {
    let currentLineWidth=ctx.lineWidth;
    let currentStrokeStyle=ctx.strokeStyle;
    for(let i=0;i<linesDB.length;i++){
        let line=linesDB[i];
        for(let i=0;i<line.length;i++){
            let pointObject=line[i];
            if(pointObject.type =="md"){
                ctx.lineWidth=pointObject.lineWidth;
                ctx.strokeStyle=pointObject.strokeStyle;
                ctx.beginPath();
                ctx.moveTo(pointObject.x , pointObject.y);
            }else{
                ctx.lineTo(pointObject.x,pointObject.y);
                ctx.stroke();
            }
        }
    }
   ctx.lineWidth=currentLineWidth;
   ctx.strokeStyle=currentStrokeStyle; 
}