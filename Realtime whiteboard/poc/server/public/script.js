let canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;

canvas.width = window.innerWidth;

const tool = canvas.getContext("2d");

// color-> black

// tool.strokeStyle="red";
tool.fillStyle="white";

// tool.lineWidth=10;
tool.fillRect(0, 0, canvas.width, canvas.height);

tool.lineWidth=4;

// tool.beginPath();
// tool.moveTo(canvas.width/2,canvas.height/2);
// tool.lineTo(canvas.width/2 +100,canvas.height/2+100);

// tool.stroke();

let undostack=[];
let redostack=[];

let pressed=false;
canvas.addEventListener("mousedown",function(e){
    tool.beginPath();
    let x=e.clientX, y=getrealcoordinate(e.clientY);
    tool.moveTo(x,y);
    pressed=true;

    let pointdiscr={
        x:x,
        y:y,
        descr:"md"
    }

    undostack.push(pointdiscr);
})

window .addEventListener("mousemove",function(e){
    if(pressed){

        let x=e.clientX, y=getrealcoordinate(e.clientY);
        console.log(x,y);
        tool.lineTo(x,y);
        tool.stroke();

        let pointdiscr={
            x:x,
            y:y,
            descr:"mm"
        }

        undostack.push(pointdiscr);
    }
    
})

window.addEventListener("mouseup",function(e){
    if(pressed){

        pressed=false;
    }
})

function getrealcoordinate(y){
    let bounds=canvas.getBoundingClientRect();
    return y-bounds.y;
}

let stickypad=document.querySelector(".stickypad");
let tools=document.querySelectorAll(".tool-image");    //yha class tool image wale sb elements aa gaye
for(let i=0;i<tools.length;i++ ){
    // tools[i].addEventListener("mouseenter",function(e){             // haar ek pe same chex assign kaar di
    //     // console.log(e);
    //     let ctool=e.currentTarget;
    //     let name=ctool.getAttribute("id");                    //kha pe click hua
        
    //     document.getElementById(name).style.border="2px solid black";
    // })

    // tools[i].addEventListener("mouseleave",function(e){             // haar ek pe same chex assign kaar di
    //     // console.log(e);
    //     let ctool=e.currentTarget;
    //     let name=ctool.getAttribute("id");                    //kha pe click hua
        
    //     document.getElementById(name).style.border="2px solid white";
    // })

    tools[i].addEventListener("click",function(e){             // haar ek pe same chex assign kaar di
        // console.log(e);

        let ctool=e.currentTarget;                      //kha pe click hua
        let name=ctool.getAttribute("id");
        // document.getElementById(name).style.border="2px solid red ";
        if(name=="pencil"){
            tool.strokeStyle="black";
        }
        else if(name=="eraser"){
            tool.strokeStyle="white";
        }
        else if(name=="stickynotes"){
            stickypad.style.display="block"; 
        }
        else if(name=="undo"){
            removefromundostack();
        }
        else if(name=="redo"){
            addfromredostack();
        }
        else if(name=="download"){

            download();
        }
        
    })
}

let close=document.querySelector(".close");
let minimize=document.querySelector(".minimize");

let textarea=document.querySelector(".text-area");
let isminimized=false;

minimize.addEventListener("click",function(){

    if(isminimized){
        textarea.style.display="block";    
    }
    else{
        textarea.style.display="none";
    }
    isminimized=!isminimized;
})

close.addEventListener("click",function(){
    stickypad.style.display="none";
    // stickypad.remove();
})


let initialx=null;
let initialy=null;
let navbar=document.querySelectorAll(".nav-bar");
let issticky=false;

navbar[0].addEventListener("mousedown",function(e){
    console.log(e);
    initialx=e.clientX;
    initialy=e.clientY;
    issticky=true;
})

window.addEventListener("mousemove", function (e) {
    if (issticky == true) {
        // final point 
        let finalX = e.clientX;
        let finalY = e.clientY;
        //  distance
        let dx = finalX - initialx;
        let dy = finalY - initialy;
        //  move sticky
        //original top left
        let { top, left } = stickypad.getBoundingClientRect()
        // stickyPad.style.top=10+"px";
        stickypad.style.top = top + dy + "px";
        stickypad.style.left = left + dx + "px";
        initialx = finalX;
        initialy = finalY;
    }
})
window.addEventListener("mouseup", function () {
    if (issticky == true){
        issticky = false;

    }
})

function removefromundostack(){
    // console.log(undostack);
    while(undostack.length>0){
        let {x,y,descr}= undostack[undostack.length - 1];

        let pointdiscr={
            x:x,
            y:y,
            descr:descr
        }

        if(descr=="mm"){
            redostack.push(pointdiscr);
            undostack.pop();
        }
        else if(descr=="md"){
            redostack.push(pointdiscr);
            undostack.pop();
            break;
        }
    }

    tool.clearRect(0, 0, canvas.width, canvas.height);
    redraw();
}

function redraw(){
    for(let i=0;i<undostack.length;i++){
        let {x,y,descr}= undostack[i];
        console.log(x,y);
        if(descr=="md"){
            tool.beginPath();
            tool.moveTo(x,y);
        }
        else if(descr=="mm"){
            tool.lineTo(x,y);
            tool.stroke();
        }
    }
}

function addfromredostack(){
    
    if(redostack.length>0){
        let {x,y,descr}=redostack[redostack.length-1];
        if(descr=="md"){
            tool.beginPath();
            tool.moveTo(x,y);
        }
        undostack.push({x,y,descr});
        redostack.pop();
    }
    // console.log(redostack[redostack.length-1]);
    while(redostack.length>0){
        let {x,y,descr}=redostack[redostack.length-1];
        if(descr=="mm"){
            tool.lineTo(x,y);
            tool.stroke();
            undostack.push({x,y,descr});
            redostack.pop();
        }
        else{
            break;
        }
    }
}

function download() {
    //  create an anchor
    let a = document.createElement("a");
    //  set filename to it's download attribute
    a.download = "file.png";
    //  convert board to url 
    let url = canvas.toDataURL("image/jpeg;base64");
    //  set as href of anchor
    a.href = url;
    // click the anchor
    a.click();

}