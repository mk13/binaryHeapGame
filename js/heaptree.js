//Initializes game
function initGame(nodesCount){//Make adjustable later
	numberOfNodes = nodesCount;
	valRange = 100;
	var maxLevel = levelOfIndex(numberOfNodes-1)-1;
	arrLength = (Math.pow(2,maxLevel)-1)*2 + 1;
	//if (numberOfNodes === arrLength){
	//	maxLevel = levelOfIndex(numberOfNodes-1);
	//	arrLength = (Math.pow(2,maxLevel)-1)*2 + 1;
	//}
	for (i=0; i < numberOfNodes; i++)
		gameArray[i] = Math.floor(Math.random()*valRange);
	for (i=numberOfNodes; i < arrLength; i++)
		gameArray[i] = -1;
	
	gameArray = shuffleArray(gameArray);
}

//SOURCE: https://github.com/coolaj86/knuth-shuffle
function shuffleArray(array){
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function LEFT(n){
	return 2*n + 1;
}

function RIGHT(n){
	return 2*n + 2;
}

function PARENT(n){
	return Math.floor((n-1)/2);
}

//Recursive check at a given node to see if its entire subtree is a heap
//	TRUE  :: is heap
//	FALSE :: is NOT heap
//  TO ADD: Conditions for a win? Balanced? If not, count all nodes.
function verifyHeap(currentIndex){
	for (i = 0; i < numberOfNodes; i++)
		if (gameArray[i] === -1)
			return false;
	var currElement = gameArray[currentIndex];
	var noLeft = LEFT(currentIndex) >= arrLength || gameArray[LEFT(currentIndex)] === -1;
	var noRight = RIGHT(currentIndex) >= arrLength || gameArray[RIGHT(currentIndex)] === -1;
	if (noLeft && noRight)
		return true;
	if (LEFT(currentIndex) < arrLength && gameArray[LEFT(currentIndex)] > currElement)
		return false;
	else if (RIGHT(currentIndex) < arrLength && gameArray[RIGHT(currentIndex)] > currElement)
		return false;
	else
		return verifyHeap(LEFT(currentIndex)) && verifyHeap(RIGHT(currentIndex));
}

//Checks entire tree if it is a heap
function verifyGame(){
	verifyHeap(0);
}

//Only checks current node with its two children
function verifyNode(currentIndex){
	currElement = gameArray[currentIndex];
	if (LEFT(currentIndex) <= (numberOfElements-1) && gameArray[LEFT(currentIndex)] > currElement)
		return false;
	else if (RIGHT(currentIndex) <= (numberOfElements-1) && gameArray[RIGHT(currentIndex)] > currElement)
		return false;
	return true;
}

//Given a root index r, and arbitrary index i,
//returns the relative x,y coordinates,
//used to draw node i with node r as root.
//X-cap is 0-3, Y-cap 0-7
//If not in scope of being drawn, returns [-1,-1]
function getCoords(r, i, l){
	if (r > i || (8*r+14) < i){
		return [-1,-1];
	}
	else if (i === r){
		return [0,0];
	}
	else if (i >= (2*r+1) && i <= (2*r+2)){
		return [1, i - (2*r) - 1];
	}
	else if (i >= (4*r+3) && i <= (4*r+6)){
		return [2, i - (4*r) - 3];
	}
	else if (i >= (8*r+7) && i <= (8*r+14)){
		return [3, i - (8*r) - 7];
	}
	else
		return [-1,-1];
}

//Swaps the values within two nodes a and b
function swap(a, b){
	var temp = gameArray[a];
	gameArray[a] = gameArray[b];
	gameArray[b] = temp;
}

function levelOfIndex(i){
	if (i === 0)
		return 1;
	else
		return Math.floor(Math.log(i+1)/Math.log(2)) + 1;
}