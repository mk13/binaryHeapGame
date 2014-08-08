var gameArray = new Array();
var numberOfNodes;
var arrLength;
var valRange;

var canvas, context;

var SELECTEDNODE = null;			//At most only one node can be selected
var HIGHLIGHTEDNODE = 0;			//At most only one node can be highlighted; should never be null
var ROOTNODE = 0;					//At most only one node can be at the top/root; should never be null

var GAME_HAS_ENDED = false;

var BODY = document.getElementsByTagName("body")[0];



//window.requestAnimFrame = (function(){
//      return  window.requestAnimationFrame       || 
//              window.webkitRequestAnimationFrame || 
//              window.mozRequestAnimationFrame    || 
//              window.oRequestAnimationFrame      || 
//             window.msRequestAnimationFrame     || 
//              function(/* function */ callback, /* DOMElement */ element){
//                window.setTimeout(callback, 1000 / 60);
//              };
//})();


function canvasInit(){
	canvas = document.createElement('canvas');
	canvas.width = 500;
	canvas.height = 500;
	
	context = canvas.getContext('2d');
	document.body.appendChild(canvas);
	
	context.font = "20px Serif";
}
