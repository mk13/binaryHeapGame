document.onkeydown = checkKey;		//try up later

function checkGame(){
	if (GAME_HAS_ENDED || verifyGame()){
		console.log("GAME HAS ENDED; TREE IS HEAP");
		GAME_HAS_ENDED = true;
		ROOTNODE = 0;
		updateAllGUI();
		drawEndText();
	}
}

function checkKey(e){
	e.preventDefault();
	e = e || window.event;
	
	if (GAME_HAS_ENDED)
		return;
	
	switch(e.keyCode){
		//space
		case 32 :
			spaceButton();
			break;
		//left
		case 37:
			leftArrow();
            break;
        //up
		case 38:
            upArrow();
            break;
        //right
		case 39:
			rightArrow();
            break;
        //down
		case 40:
            downArrow();
            break;
		default:
			break;
	}
}

/*
function leftArrow();
function rightArrow();
function upArrow();
function downArrow();
*/
function upArrow(){
	if (HIGHLIGHTEDNODE === 0)
		return;
	cancelHighlight();
	var p = PARENT(HIGHLIGHTEDNODE);
	if (p < ROOTNODE){
		ROOTNODE = p;
		HIGHLIGHTEDNODE = p;
		updateAllGUI();
	}
	else{
		HIGHLIGHTEDNODE = p;
		drawHighlight();
	}	
}

function downArrow(){
	var c;
	if (LEFT(HIGHLIGHTEDNODE) >= arrLength){
		if (RIGHT(HIGHLIGHTEDNODE) >= arrLength)
			return;
		else
			c = RIGHT(HIGHLIGHTEDNODE);
	}
	else
		c = LEFT(HIGHLIGHTEDNODE);
		
	cancelHighlight();
	if (!inVisualScope(c)){
		ROOTNODE = PARENT(PARENT(HIGHLIGHTEDNODE));
		HIGHLIGHTEDNODE = c;
		updateAllGUI();
	}
	else{
		HIGHLIGHTEDNODE = c;
		drawHighlight();
	}		
}

function leftArrow(){
	l = HIGHLIGHTEDNODE - 1;


	if (levelOfIndex(l) === levelOfIndex(HIGHLIGHTEDNODE) && inVisualScope(l)){
		cancelHighlight();
		HIGHLIGHTEDNODE = l;
		drawHighlight();
	}
	else{
		var nextlevel = levelOfIndex(HIGHLIGHTEDNODE);
		var start = Math.pow(2,nextlevel)-1;
		var end = start*2;
		for (var z = start; z <= end; z++){
			l = z;
			if (inVisualScope(l)){
				cancelHighlight();
				HIGHLIGHTEDNODE = l;
				drawHighlight();
				break;
			}
		}
	}
	if (l < 0 || !inVisualScope(l))
		return;
}
function rightArrow(){
	var r = HIGHLIGHTEDNODE + 1;
		
	if (levelOfIndex(r) === levelOfIndex(HIGHLIGHTEDNODE) && inVisualScope(r)){
			cancelHighlight();
			HIGHLIGHTEDNODE = r;
			drawHighlight();
	}
	else{
		var nextlevel = levelOfIndex(HIGHLIGHTEDNODE);
		var end = Math.pow(2, nextlevel)-1;
		var start = Math.min(end * 2, arrLength-1);
		for (var z = start; z >= end; z--){
			r = z;
			if (inVisualScope(r)){
				cancelHighlight();
				HIGHLIGHTEDNODE = r;
				drawHighlight();
				break;
			}
		}
	}
	if (r >= arrLength || !inVisualScope(r))
		return;
}

function spaceButton(){
	if (SELECTEDNODE === null){
		SELECTEDNODE = HIGHLIGHTEDNODE;
		drawSelected();
		fillSideBar();
	}
	else{
		swap(SELECTEDNODE,HIGHLIGHTEDNODE);
		SELECTEDNODE = null;
		updateAllGUI();
		checkGame();
	}
}

(function() {
	initGame(17);		//Change number to change # of active nodes
	canvasInit();
	clearCanvas();
	updateAllGUI();
})();