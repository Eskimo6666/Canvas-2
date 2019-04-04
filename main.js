
var Canvas = document.getElementById("xxx")

var ctx = Canvas.getContext('2d')

ctx.fillStyle = 'white'
ctx.beginPath(); 
ctx.rect(0,0,Canvas.width,Canvas.height); ctx.fill()
var lineWidth = 5
autoSetCanvasSize(Canvas)
listenToUser(Canvas)

var colorList={
  red:'rgb(226,106,107)',
  green:'rgb(25,176,145)',
  yellow:'rgb(241,196,14)',
  blue:'rgb(54,152,219)',
  purple:'rgb(176,156,255)'
}

colors.onclick = function(z){
  var currentColor = z.target.className
 pencil.style='fill:'+colorList[currentColor]+";"
 
}


var eraserEnabled = false
 pencil.onclick = function(){
   eraserEnabled = false
   pencil.classList.add('active')
   eraser.classList.remove('active')
   clear.classList.remove('active')
   save.classList.remove('active')
 }
 eraser.onclick = function(){
   eraserEnabled = true
   eraser.classList.add('active')
   pencil.classList.remove('active')
   clear.classList.remove('active')
   save.classList.remove('active')
 }
 clear.onclick = function(){  
   clear.classList.add('active')
   pencil.classList.remove('active')
   eraser.classList.remove('active')
   save.classList.remove('active')
 ctx.clearRect(0,0,Canvas.width,Canvas.height)
 }
 save.onclick = function(){
   save.classList.add('active')
   pencil.classList.remove('active')
   clear.classList.remove('active')
   eraser.classList.remove('active')
   var url = Canvas.toDataURL('image/png')
   var a = document.createElement('a')
   document.body.appendChild(a)
   a.href = url
   a.download = '我的画'
   a.click()
 }
red.onclick=function(){
  ctx.strokeStyle = 'rgb(226,106,107)'
  ctx.fillStyle = 'rgb(226,106,107)'
}
green.onclick = function(){
  ctx.strokeStyle = 'rgb(25,176,145)'
  ctx.fillStyle = 'rgb(25,176,145)'
}
yellow.onclick = function(){
  ctx.strokeStyle = 'rgb(241,196,14)'
  ctx.fillStyle = 'rgb(241,196,14)'
}
blue.onclick = function(){
  ctx.strokeStyle = 'rgb(54,152,219)'
  ctx.fillStyle = 'rgb(54,152,219)'
}
purple.onclick = function(){
  ctx.strokeStyle = 'rgb(176,156,255)'
  ctx.fillStyle = 'rgb(176,156,255)'
}
thin.onclick = function(){
  lineWidth = 5
}
medium.onclick = function(){
  lineWidth = 10
}
blod.onclick = function(){
  lineWidth = 15
}
/****************/
 
function autoSetCanvasSize(yyy){
  
  setCanvasSize()
  window.onresize = function(){
    setCanvasSize()
  }
  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    yyy.width = pageWidth
    yyy.height = pageHeight
  }
}


function drawLine(x1,y1,x2,y2){
  ctx.beginPath();
  
  ctx.moveTo(x1,y1);
  ctx.lineWidth=lineWidth
  ctx.lineTo(x2,y2);
  ctx.stroke();
}

function drawCircle(x,y,r){ 
  ctx.beginPath();
  
  ctx.arc(x,y,r,0,Math.PI*2);
  ctx.fill();    
}


function listenToUser(canvas){
  var using = false
  var lastPoint = {x:undefined,y:undefined}
 if(document.body.ontouchstart !== undefined){
    
   canvas.ontouchstart = function(aaa){
     console.log(aaa)
      var x = aaa.touches[0].clientX
     var y = aaa.touches[0].clientY
     console.log(x,y)
     using = true
     if(eraserEnabled){
       ctx.clearRect(x-5,y-5,10,10)

     }else{

       lastPoint = {x:x,y:y}
       drawCircle(x,y,1)
     }
   }
   canvas.ontouchmove = function(aaa){
     var x = aaa.touches[0].clientX
     var y = aaa.touches[0].clientY
     if(!using){
       return
     }
     if(eraserEnabled){
       ctx.clearRect(x-5,y-5,10,10)
     }else{
       using = true    
       var newPoint = {x:x,y:y}
       drawCircle(x,y,1)
       drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
       lastPoint = newPoint
     }
   }
   canvas.ontouchend = function(){
      using = false
   }
 }else{
   canvas.onmousedown = function(z){
     var x = z.clientX
     var y = z.clientY
     using = true
     if(eraserEnabled){
       ctx.clearRect(x-5,y-5,10,10)

     }else{

       lastPoint = {x:x,y:y}
       drawCircle(x,y,1)
     }
   }
   canvas.onmousemove = function(z){
     var x = z.clientX
     var y = z.clientY
     if(!using){
       return
     }
     if(eraserEnabled){
       ctx.clearRect(x-5,y-5,10,10)
     }else{
       using = true    
       var newPoint = {x:x,y:y}
       drawCircle(x,y,1)
       drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
       lastPoint = newPoint
     }
   }
   canvas.onmouseup = function(z){  
     using = false
   }
 }
  
 
}

