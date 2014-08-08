//Initialize canvas and context beforehand

//Layering is as follows:
//		1. Lines
//		2. Nodes
//		3. Highlight and Select rings

var COLORBLACK = '#000000';
var COLORWHITE = '#FFFFFF';
var BACKGROUNDCOLOR = '#AAAAAA';
var COLORRED = '#FF2244'
var COLORBLUE = '#0000FF';
var COLORGREEN = '#CCFF11';
var COLORGRAY = '#333333';

var HCOLOR = ['#00FFCC',
			  '#44FFAA',
			  '#88FF77',
			  '#CCFF22']

var xCoord = [[240],
			  [130, 350],
			  [75, 185, 295, 405],
			  [50, 100, 160, 210, 270, 320, 380, 430]
			 ]; 

var yCoord = [70, 160, 280, 380];

function updateAllGUI(){
	clearCanvas();
	drawAllLines();
	drawAllNode(ROOTNODE);
	drawSelected();
	drawHighlight();
}

function clearCanvas(){
	context.fillStyle = BACKGROUNDCOLOR;
	context.fillRect(0, 0, canvas.width, canvas.height);
}

//Given a node i,
//returns true if node i is in GUI;
//else returns false
function inVisualScope(i){
	if (ROOTNODE === i)
		return true;
	else if (i === (ROOTNODE*2 + 1) || i === (ROOTNODE*2 + 2))
		return true;
	else if (i >= (ROOTNODE*4 + 3) && i <= (ROOTNODE*4 + 6))
		return true;
	else if (i >= (ROOTNODE*8 + 7) && i <= (ROOTNODE*8 + 14))
		return true;
	else
		return false;
}

//Helper function;
function drawOuterRing(x, y, color){
	context.strokeStyle = color;
	context.lineWidth = 5;
	context.beginPath();
	context.arc(xCoord[y][x], yCoord[y], 20, 0, 2 * Math.PI);
	context.stroke();
	context.closePath();
}

//Helper function;
function drawInnerRing(x, y, color){
	context.strokeStyle = color;
	context.lineWidth = 5;
	context.beginPath();
	context.arc(xCoord[y][x], yCoord[y], 15, 0, 2 * Math.PI);
	context.stroke();
	context.closePath();
}

//Draws a given node i from gameArray
//r := current root index
//i := node to be drawn
function drawNode(r, i){
	if (i >= arrLength)
		return;
		
	var arr = getCoords(r, i, arrLength);
	//if (arr[0] < 0 || gameArray[i] === -1 || i > arrLength)
	//	return;
	var x = arr[1];
	var y = arr[0];
	
	if (gameArray[i] !== -1){
		context.fillStyle = HCOLOR[y];		//Select base color of node based on its height
		context.beginPath();				
		context.arc(xCoord[y][x], yCoord[y], 20, 0, 2 * Math.PI);
		context.closePath();
		context.fill();						//Fill base color
		
		context.fillStyle = COLORBLACK;		//Font color
		if (gameArray[i]/10 < 1)
			context.fillText(gameArray[i].toString(), xCoord[y][x]-5, yCoord[y]+7);
		else
			context.fillText(gameArray[i].toString(), xCoord[y][x]-10, yCoord[y]+7);	//Draw number of node
	}
	
	
	if (gameArray[i] === -1)
		drawOuterRing(x,y,COLORGRAY);
	else
		drawOuterRing(x,y,COLORBLACK);
	
	drawInnerRing(x,y,COLORWHITE);
}

function drawEndText(){
	context.fillStyle = COLORBLACK;
	context.font = '50px Arial';
	context.fillText("GAME WON!", 80, 250);
}

//If a node is selected, highlights as red
function drawSelected(){
		if (SELECTEDNODE === null)
			return;
			
		var arr = getCoords(ROOTNODE, SELECTEDNODE, arrLength);
		if (arr[0] < 0 || SELECTEDNODE > arrLength)
			return;
		var x = arr[1];
		var y= arr[0];
		
		drawInnerRing(x,y,COLORRED);
}

//Over-writes the graphic on a selected node;
//Also sets to null if it is not
function cancelSelected(){
		if (SELECTEDNODE === null)
			return;
			
		var arr = getCoords(ROOTNODE, SELECTEDNODE, arrLength);
		if (arr[0] < 0 || SELECTEDNODE > arrLength)
			return;
		var x = arr[1];
		var y= arr[0];
		
		drawInnerRing(x,y,COLORWHITE);
}

function drawHighlight(){
		var arr = getCoords(ROOTNODE, HIGHLIGHTEDNODE, arrLength);
		if (arr[0] < 0 || HIGHLIGHTEDNODE > arrLength)
			return;
		var x = arr[1];
		var y = arr[0];
		
		drawOuterRing(x,y,COLORBLUE);
}

function cancelHighlight(){
		var arr = getCoords(ROOTNODE, HIGHLIGHTEDNODE, arrLength);
		if (arr[0] < 0  || HIGHLIGHTEDNODE > arrLength)
			return;
		var x = arr[1];
		var y = arr[0];
		
		if (gameArray[HIGHLIGHTEDNODE] < 0)
			drawOuterRing(x,y,COLORGRAY);
		else
			drawOuterRing(x,y,COLORBLACK);
}


//Given a root node r, draws all 15 nodes including r
function drawAllNode(r){
	var c = [r,
			2*r+1, 2*r+2,
			4*r+3, 4*r+4, 4*r+5, 4*r+6,
			8*r+7, 8*r+8, 8*r+9, 8*r+10, 8*r+11, 8*r+12, 8*r+13, 8*r+14];
	for (var k = 0; k < 15;k++)
		drawNode(r, c[k]);
}


function drawLine(x1,y1,x2,y2, color){
	context.lineWidth='3';
	context.strokeStyle = color;
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.stroke();
	context.closePath();
}

//Given a root node r, draw all lines
//Line is green if the relation between nodes satisfies heap property
//Line is red if the relation doesn't
function drawAllLines(){
	var p = PARENT(ROOTNODE);
	var arr = getCoords(ROOTNODE,ROOTNODE, arrLength);
	var x = arr[1];
	var y = arr[0];

	if (ROOTNODE !== 0){
		var color;
		if (gameArray[p] === -1)
			color = COLORGRAY;
		else
			color = (gameArray[p] >= gameArray[ROOTNODE]) ? COLORGREEN : COLORRED;
		if (LEFT(p) === ROOTNODE)
			drawLine(xCoord[y][x], yCoord[y],470, 0,color);
		else
			drawLine(xCoord[y][x], yCoord[y],10,0,color);
	}
	recurseDrawLine(ROOTNODE);
}
//Helper function for 'drawAllLines()'
function recurseDrawLine(i){
	if (i >= arrLength || gameArray[i] === -1)
		return;
		
	var l = LEFT(i);
	var r = RIGHT(i);
	var color;
	var a = getCoords(ROOTNODE, i, arrLength);
	if (a[0] < 0)
		return;
	
	la = getCoords(ROOTNODE, l, arrLength);
	ra = getCoords(ROOTNODE, r, arrLength);
	
	//Draw left
	if (l < arrLength && gameArray[l] !== -1){
		color = (gameArray[i] >= gameArray[l]) ? COLORGREEN : COLORRED;
		if (la[0] > 0){
			drawLine(xCoord[a[0]][a[1]], yCoord[a[0]], xCoord[la[0]][la[1]], yCoord[la[0]], color);
		}
		else if(la[0] < 0 && gameArray[l] !== -1){
			drawLine(xCoord[a[0]][a[1]], yCoord[a[0]], xCoord[a[0]][a[1]] - 20, 450, color);
		}
	}

	//Draw right
	if (r < arrLength && gameArray[r] !== -1){
		color = (gameArray[i] >= gameArray[r]) ? COLORGREEN : COLORRED;
		if (ra[0] > 0){
			drawLine(xCoord[a[0]][a[1]], yCoord[a[0]], xCoord[ra[0]][ra[1]], yCoord[ra[0]], color);
		}
		else if(la[0] < 0 && gameArray[l] !== -1){
			drawLine(xCoord[a[0]][a[1]], yCoord[a[0]], xCoord[a[0]][a[1]] + 20, 450, color);
		}
	}
	recurseDrawLine(l);
	recurseDrawLine(r);
}