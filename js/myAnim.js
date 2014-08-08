 window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
})();

var canvas, context, toggle;
var angle;
angle = 0;
init();
console.log(canvas.width);
console.log(canvas.height);

requestAnimFrame(animate);


function init(){
	canvas = document.createElement('canvas');
	canvas.width = 512;
	canvas.height = 512;

	context = canvas.getContext('2d');
	document.body.appendChild(canvas);
}

function draw(){
	//context.clearRect(0,0,canvas.width, canvas.height);
	context.fillStyle = '#FFFFFF';
	context.fillRect(0,0,512,512);
	var x = Math.sin(angle)*100 + 150;
	var y = Math.cos(angle)*100 + 120;
	context.fillStyle = '#FF0000';
	context.beginPath();
	context.arc(x,y,10,0,2*Math.PI);
	context.closePath();
	context.fill();
}

function animate(){
	if (angle >= Math.PI){
		angle = 0;
	}
	else {
		angle = angle + 0.1;
		requestAnimFrame(animate);
		draw();
	}
}
