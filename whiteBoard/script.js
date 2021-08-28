let canvas=document.querySelector("#canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-100;
    drawLinesDB();
});
let ctx=canvas.getContext("2d");
let linesDB=[];
let redoLineDB=[];
let isPenDown=false;
let line=[];

canvas.addEventListener("mousedown",function(e){

    if(redoLineDB.length){
        redoLineDB=[];
    }
    console.log("inside mousedown");
    isPenDown=true;
    let x=e.clientX;
    let y=e.clientY-100;
    ctx.beginPath();
    ctx.moveTo(x,y);

    let pointObject={
        x:x,
        y:y,
        type:"md",
        lineWidth : ctx.lineWidth,
        strokeStyle:ctx.strokeStyle,
    };
    line.push(pointObject);
});
canvas.addEventListener("mousemove",function(e){
    if(isPenDown){
        console.log("inside mousemove");
        let x=e.clientX;
        let y=e.clientY-100;
        ctx.lineTo(x,y);
        ctx.stroke();
        let pointObject={
            x:x,
            y:y,
            type:"mm"
        };
        line.push(pointObject);
    }
});

canvas.addEventListener("mouseup",function(e){
    console.log("mouseup");
    isPenDown=false;
    linesDB.push(line);
    line=[];
    console.log(linesDB);
});