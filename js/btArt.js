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
var COLORGRAY2 = '#CCCCCC';

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
	drawBorder();
	drawAllLines();
	fillSideBar();
	drawAllNode(ROOTNODE);
	drawSelected();
	drawHighlight();
}

function clearCanvas(){
	context.fillStyle = BACKGROUNDCOLOR;
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBorder(){
	context.strokeStyle = '2px';
	drawLine(0,70, 520, 70, COLORGRAY2);
	drawLine(0,160, 520, 160, COLORGRAY2);
	drawLine(0,280, 520, 280, COLORGRAY2);
	drawLine(0,380, 520, 380, COLORGRAY2);
	
	context.strokeStyle = '5px';
	drawLine(500,0, 500, 500, COLORBLACK);
}

function fillSideBar(){
	var rowNum = levelOfIndex(ROOTNODE);
	context.fillStyle = COLORBLACK;
	context.font = '20px Arial';
	var s = "Selected: ";
	if (SELECTEDNODE !== null && gameArray[SELECTEDNODE] !== -1)
		s = s + gameArray[SELECTEDNODE].toString();
	context.fillText(s, 520, 480);
	
	context.fillText('ROW NUMBER:', 520, 20);
	for (var i = 0; i < 4; i++)
		context.fillText((rowNum+i).toString(), 540, yCoord[i] + 10);
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
	var x = arr[1];
	var y = arr[0];
	
	if (gameArray[i] !== -1){
		context.fillStyle = HCOLOR[y];		//Select base color of node based on its height
		context.beginPath();				
		context.arc(xCoord[y][x], yCoord[y], 20, 0, 2 * Math.PI);
		context.closePath();
		context.fill();						//Fill base color
		
		context.fillStyle = COLORBLACK;		//Font color
		context.font="italic small-caps bold 12px arial";
		if (gameArray[i]/10 < 1)
			context.fillText(gameArray[i].toString(), xCoord[y][x]-5, yCoord[y]+5);
		else
			context.fillText(gameArray[i].toString(), xCoord[y][x]-7, yCoord[y]+5);	//Draw number of node
	}
	else{
		context.fillStyle = BACKGROUNDCOLOR;
		context.beginPath();
		context.arc(xCoord[y][x], yCoord[y], 20, 0, 2 * Math.PI);
		context.closePath();
		context.fill();
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
		if (gameArray[p] === -1 || gameArray[ROOTNODE] === -1)
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
	if (i >= arrLength)	
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
	if (l < arrLength){
		if (gameArray[l] === -1 || gameArray[i] === -1)
			color = COLORGRAY;
		else
			color = (gameArray[i] >= gameArray[l]) ? COLORGREEN : COLORRED;
		
		//If left child is visible
		if (la[0] > 0){
			drawLine(xCoord[a[0]][a[1]], yCoord[a[0]], xCoord[la[0]][la[1]], yCoord[la[0]], color);
		}
		//If left child is NOT visible, but exists
		else{
			drawLine(xCoord[a[0]][a[1]], yCoord[a[0]], xCoord[a[0]][a[1]] - 20, 450, color);
		}
	}

	//Draw right
	if (r < arrLength){
		if (gameArray[r] === -1 || gameArray[i] === -1)
			color = COLORGRAY;
		else
			color = (gameArray[i] >= gameArray[r]) ? COLORGREEN : COLORRED;
		
		//If right child is visible
		if (ra[0] > 0){
			drawLine(xCoord[a[0]][a[1]], yCoord[a[0]], xCoord[ra[0]][ra[1]], yCoord[ra[0]], color);
		}
		//If right child is NOT visible, but exists
		else{
			drawLine(xCoord[a[0]][a[1]], yCoord[a[0]], xCoord[a[0]][a[1]] + 20, 450, color);
		}
	}
	recurseDrawLine(l);
	recurseDrawLine(r);
}

