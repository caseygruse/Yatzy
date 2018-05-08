let rollNum:number = 1;
let turnNum:number = 1;
window.onload = function(){
    
    
    
    
    firstRoll();
    secondRollButtonClick("roll2");
    //resetRollNum();
    
    startPlaying();
    //move dice to hand
    MoveDice("inPlay1", "hand1");
    MoveDice("inPlay2", "hand2");
    MoveDice("inPlay3", "hand3");
    MoveDice("inPlay4", "hand4");
    MoveDice("inPlay5", "hand5");
    //move dice back to in play
    MoveDice("hand1", "inPlay1");
    MoveDice("hand2", "inPlay2");
    MoveDice("hand3", "inPlay3");
    MoveDice("hand4", "inPlay4");
    MoveDice("hand5", "inPlay5"); 

    
};



/**
 * allows users to name their player names and puts there inputs into the score card
 */
function startPlaying():void{
    document.getElementById("letsPlay").addEventListener("click", function() {
    let player1:string = (<HTMLInputElement>document.getElementById("player1Name")).value;
    let player2:string = (<HTMLInputElement>document.getElementById("player2Name")).value;
    (<HTMLSpanElement>document.getElementById("player1")).textContent = player1;
    (<HTMLSpanElement>document.getElementById("player2")).textContent = player2;
    
    })
}   
var inHandScore:number[] = [0,0,0,0,0];
/**
 * hooks a click event to roll all 5 dice.
 * fills the inplay img tags with a random src and value that matches.
 */
function firstRoll():void{
    //let images = createImageArray();
    let imagesValue = createImageValueArray();
    let imageArray = createImageArray();
    document.getElementById("roll").onclick = function(){
        for(var i = 0; i < 5; i++){
            let randValue:string = imagesValue[Math.floor(Math.random() * 6)]
            document.getElementsByTagName("img")[i].setAttribute("value", randValue);
            let giveImgValue = parseInt(document.getElementsByTagName("img")[i].getAttribute("value"));
            document.getElementsByTagName("img")[i].setAttribute("src", imageArray[giveImgValue-1]);
        } 
        rollNum++;
        if(rollNum >1){
            document.getElementById("roll").setAttribute("disabled", "true");
        }
    }  
}


/**
 * Creates an array of dice images
 */
function createImageArray():string[]{
    let images = ["dice/1.png", "dice/2.png", "dice/3.png", "dice/4.png", "dice/5.png", "dice/6.png"];
    let imageValue = [1, 2, 3, 4, 5, 6];
    return images;    
}
/**
 * Creates an array of 1 through 6 for values which are used for the image tags.
 */
function createImageValueArray():string[]{
    let imageValue = ["1", "2", "3", "4", "5", "6"];
    return imageValue;    
}

    



function MoveDice(inPlayId:string, handId:string){
    let inPlayImage = document.getElementById(inPlayId);
    let inHandImage = document.getElementById(handId);
    inPlayImage.addEventListener("click", function(){
        if(inPlayImage.getAttribute("src") != ""){
            inHandImage.setAttribute("src", inPlayImage.getAttribute("src"));
            inHandImage.setAttribute("value", inPlayImage.getAttribute("value"));
            inPlayImage.setAttribute("src", "");
            inPlayImage.setAttribute("value", "0");
            inHandScoreArray();
            //put score card function calls here
            PopulatePlayer1Score();
        }
    })
}

//attatch to a button click for second roll
//should only roll the dice that are in play.
function secondRoll(inPlayId:string):void{
    let inPlayDice = document.getElementById(inPlayId);
    let imagesValue = createImageValueArray();
    let imageArray = createImageArray();
    if(inPlayDice.getAttribute("value")!="0"){
        let randValue:string = imagesValue[Math.floor(Math.random() * 6)]
        inPlayDice.setAttribute("value", randValue);
        let giveImgValue = parseInt(inPlayDice.getAttribute("value"));
        inPlayDice.setAttribute("src", imageArray[giveImgValue-1]);
    }
}
/**
 * rolls only the die that are in play
 * @param buttonId = what ever button you want to be hooked up to the click event
 */
function secondRollButtonClick(buttonId:string){
    document.getElementById(buttonId).onclick = function(){
        secondRoll("inPlay1");
        secondRoll("inPlay2");
        secondRoll("inPlay3");
        secondRoll("inPlay4");
        secondRoll("inPlay5");
        rollNum++;
        if(rollNum >3){
            document.getElementById("roll2").setAttribute("disabled", "true");
        }
    }
}





/**
 * puts all the dice values that are in your hand into an
 * array called inHandScore.
 */
function inHandScoreArray(){
    let inHandDice = document.getElementsByClassName("yourHand");
    for(var i = 0; i < inHandDice.length; i++){
        let dice = inHandDice[i];
        let diceValueInt = parseInt(dice.getAttribute("value"));
       if(isNaN(diceValueInt)){
            diceValueInt = 0;
        }
        inHandScore[i] = diceValueInt;
    }
 }


function resetRollNum(){
        rollNum = 1;
        (<HTMLButtonElement>document.getElementById("roll")).disabled = false;
        (<HTMLButtonElement>document.getElementById("roll2")).disabled = false;
 }
 

 /**
  * checks your inHandScore Array for the possible scores you have.
  * @param inputId the scorecard id that belongs to the number your checking for
  * @param scoreType the number you are checking for.
  */
 function populateScoreCardNums(inputId:string, scoreType:number){
    inHandScore.sort();
    let score = 0;
    if(inHandScore.indexOf(scoreType)!= -1){ //if the array has the number Im checking for run this code 
        //score = scoreType;
        for(var i = 0; i < inHandScore.length; i++){
            if(inHandScore[i] == scoreType){
                score+=scoreType;  
            }
        }
        let stringScore = score.toString();
        (<HTMLInputElement>document.getElementById(inputId)).value = stringScore;
    }
    else{
        (<HTMLInputElement>document.getElementById(inputId)).value = "0";
    }
}
/**
 * calls populateScoreCardNums for all player 1 scores
 */
function PopulatePlayer1Score(){
    populateScoreCardNums("1p1", 1);
    populateScoreCardNums("1p2", 2);
    populateScoreCardNums("1p3", 3);
    populateScoreCardNums("1p4", 4);
    populateScoreCardNums("1p5", 5);
    populateScoreCardNums("1p6", 6);
}


