//This will be the home to some of the JS magic :)
var canvas,
    ctx,
    tickrate,
    xmlhttp = new XMLHttpRequest(),
    listeners = [readFile],
    text,
    interval,
    map;

function begin() {
  getFile("resources/level.txt");
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = 640;
  canvas.height = 480;
  text?readMap(text):errorHandler("no map initialized");
  interval = setInterval(game, 1000/60);  
}
function getFile(file){
  listeners.forEach(function(e){xmlhttp.removeEventListener("readystate",e)});
  xmlhttp.addEventListener("readystatechange",readFile);
  xmlhttp.open("GET",file,false);
  xmlhttp.send(); 
}
function errorHandler(error){
  clearInterval(interval);
  throw error;
}
function game() {
 
  for(var i=0;i<entities.length;i++) entities[i].draw("left");
  //entities[0].draw("left");
}
function readMap(text){
  map = text.replace(/\r/g,"").split('\n'); // FOR SOME REASON text HAD AN ODD \r
  map.forEach(function(e,y){
    e.split('').forEach(function(e,x){
	  if(+e==1)drawTile(x*spriteWidth,y*spriteHeight);
	  else if(+e==0)drawEmpty(x*spriteWidth,y*spriteHeight);
	  else if(+e==2)entities.push(new Entity("hero",x*spriteWidth,y*spriteHeight, 5));
      //+e?drawTile(x*spriteWidth,y*spriteHeight):drawEmpty(x*spriteWidth,y*spriteHeight);
	  //if(+e==2) entities.push(new Entity("hero",x*spriteWidth,y*spriteHeight, 5));
    })
  });
}
function readFile(){
  text = xmlhttp.readyState==4?xmlhttp.responseText:null;
}
