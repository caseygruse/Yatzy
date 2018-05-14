let rollNum:number = 1;
let turnNum:number = 1;
let playersTurn = 1;
window.onload = function(){
    
    

    
    
    firstRoll();
    secondRollButtonClick("roll2");
    //resetRollNum();
    displayPlayerTurn();
    
    startPlaying();
    
    //make dice movable  
    //im moving this to first roll as a test delete makeDice move if it dosnt work
    //makeDiceMovable();

    //disable player 1. score boxes when clicked
    disablePlayer1Boxes();

    //disable player 2. score boxes when clicked.
    disablePlayer2Boxes();

    displayWinner();
    


    
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
        
        makeDiceMovable();

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
            if(turnNum%2 == 1){
                PopulatePlayer1Score();
            }
            if(turnNum%2 == 0){
                PopulatePlayer2Score();
            }
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



function populateScoreCardFullHouse(inputId:string){
        inHandScore.sort();
        
        if(inHandScore[0]!= 0 && inHandScore[0] == inHandScore[1] && inHandScore[1] == inHandScore[2] && inHandScore[3] == inHandScore[4] ||
            inHandScore[0]!=0 && inHandScore[0] == inHandScore[1] && inHandScore[2] == inHandScore[3] && inHandScore[2] == inHandScore[4]){
            
            (<HTMLInputElement>document.getElementById(inputId)).value = "25";
        }
        else{
            (<HTMLInputElement>document.getElementById(inputId)).value = "0";
        }
}

////////// Not working right
function populateScoreCardThreeOfAKind(inputId:string){
    inHandScore.sort();
    
    (<HTMLInputElement>document.getElementById(inputId)).value = "0";

    for(var i = 0; i < inHandScore.length-2; i++){
        
        if(inHandScore[i]==0){
            i++;
        }
        if(inHandScore[i] == inHandScore[i+1] && inHandScore[i]==inHandScore[i+2]){
           let score = inHandScore[0] + inHandScore[1] + inHandScore[2] + inHandScore[3] + inHandScore[4];
            (<HTMLInputElement>document.getElementById(inputId)).value = score.toString();
            break;
        }
            //(<HTMLInputElement>document.getElementById(inputId)).value = score.toString();
        
    }
    
}

function populateScoreCardFourOfAKind(inputId:string){
    inHandScore.sort();
    (<HTMLInputElement>document.getElementById(inputId)).value = "0";
    for(var i = 0; i < inHandScore.length-3; i++){
        if(inHandScore[0] == 0){
            i++;
        }
        if(inHandScore[i] == inHandScore[i+1] && inHandScore[i]== inHandScore[i+2]&& 
            inHandScore[i] == inHandScore[i+3]){
                let score = inHandScore[0] + inHandScore[1] + inHandScore[2] + inHandScore[3] + inHandScore[4];

                (<HTMLInputElement>document.getElementById(inputId)).value = score.toString();
        }
    }
}

function populateScoreCardSmallStraight(inputId:string){
    inHandScore.sort();
    for(var i = 0; i < inHandScore.length-3; i++){
        if(inHandScoreArray[0] == 0){
            i++;
        }
        if(inHandScore[i]+1 == inHandScore[i+1] && inHandScore[i]+2== inHandScore[i+2] && 
            inHandScore[i]+3 == inHandScore[i+3]){
                (<HTMLInputElement>document.getElementById(inputId)).value = "30";

        }
        
        else{
            (<HTMLInputElement>document.getElementById(inputId)).value = "0";

        }
    }
}


function populateScoreCardLargeStraight(inputId:string){
    inHandScore.sort();
    for(var i = 0; i < inHandScore.length-4; i++){
        if(inHandScore[i] == 0){
            (<HTMLInputElement>document.getElementById(inputId)).value = "0";

        }
        else if(inHandScore[i]+1 == inHandScore[i+1] && inHandScore[i]+2== inHandScore[i+2] && 
            inHandScore[i]+3 == inHandScore[i+3] && inHandScore[i]+4 == inHandScore[i+4]){
                (<HTMLInputElement>document.getElementById(inputId)).value = "40";
            }
    }
}


function populateScoreCardChance(inputId:string){
    let score = 0;
    for(var i = 0; i < inHandScore.length; i++){
        score += inHandScore[i];
    }
    (<HTMLInputElement>document.getElementById(inputId)).value = score.toString();

}


function populateScoreCardYatzy(inputId:string){
    let count = 0;
    for(var i = 0; i < inHandScore.length; i++){
        if(inHandScore[0] == inHandScore[i]){
            count++;
        }
    }
    if(count == 5){
        (<HTMLInputElement>document.getElementById(inputId)).value = "50";
    }
    else{
        (<HTMLInputElement>document.getElementById(inputId)).value = "0";
    }
}

/**
 * calls populateScoreCardNums for all player 1 scores
 */
function PopulatePlayer1Score(){
    //1 through six score calc
    if(document.getElementById("1p1").getAttribute("disabled") == null){
        populateScoreCardNums("1p1", 1);
    }
    if(document.getElementById("1p2").getAttribute("disabled") == null){
        populateScoreCardNums("1p2", 2);
    }
    if(document.getElementById("1p3").getAttribute("disabled") == null){
        populateScoreCardNums("1p3", 3);
    }
    if(document.getElementById("1p4").getAttribute("disabled") == null){
        populateScoreCardNums("1p4", 4);
    }
    if(document.getElementById("1p5").getAttribute("disabled") == null){
        populateScoreCardNums("1p5", 5);
    }
    if(document.getElementById("1p6").getAttribute("disabled") == null){
        populateScoreCardNums("1p6", 6);
    }
    //fullHouse
    if(document.getElementById("1pFullHouse").getAttribute("disabled") == null){
        populateScoreCardFullHouse("1pFullHouse");
    }
    //three of a kind   /////////////////////not working
    if(document.getElementById("1pThreeKind").getAttribute("disabled") == null){
        populateScoreCardThreeOfAKind("1pThreeKind");
    }
    //four of kind
    if(document.getElementById("1pFourKind").getAttribute("disabled") == null){
        populateScoreCardFourOfAKind("1pFourKind");
    }
    //small straight
    if(document.getElementById("1pSmallStraight").getAttribute("disabled") == null){
        populateScoreCardSmallStraight("1pSmallStraight");
    }
    //large straight
    if(document.getElementById("1pLargeStraight").getAttribute("disabled")== null){
        populateScoreCardLargeStraight("1pLargeStraight");
    }
    //Chance
    if(document.getElementById("1pChance").getAttribute("disabled") == null){
        populateScoreCardChance("1pChance");        
    }
    //Yatzy
    if(document.getElementById("1pYatzy").getAttribute("disabled") == null){
        populateScoreCardYatzy("1pYatzy");  
    }
}





function PopulatePlayer2Score(){
    //1 through six score calc
    if(document.getElementById("2p1").getAttribute("disabled") == null){
        populateScoreCardNums("2p1", 1);
    }
    if(document.getElementById("2p2").getAttribute("disabled") == null){
        populateScoreCardNums("2p2", 2);
    }
    if(document.getElementById("2p3").getAttribute("disabled") == null){
        populateScoreCardNums("2p3", 3);
    }
    if(document.getElementById("2p4").getAttribute("disabled") == null){
        populateScoreCardNums("2p4", 4);
    }
    if(document.getElementById("2p5").getAttribute("disabled") == null){
        populateScoreCardNums("2p5", 5);
    }
    if(document.getElementById("2p6").getAttribute("disabled") == null){
        populateScoreCardNums("2p6", 6);
    }
    //fullHouse
    if(document.getElementById("2pFullHouse").getAttribute("disabled") == null){
        populateScoreCardFullHouse("2pFullHouse");
    }
    //three of a kind   /////////////////////not working
    if(document.getElementById("2pThreeKind").getAttribute("disabled") == null){
        populateScoreCardThreeOfAKind("2pThreeKind");
    }
    //four of kind
    if(document.getElementById("2pFourKind").getAttribute("disabled") == null){
        populateScoreCardFourOfAKind("2pFourKind");
    }
    //small straight
    if(document.getElementById("2pSmallStraight").getAttribute("disabled") == null){
        populateScoreCardSmallStraight("2pSmallStraight");
    }
    //large straight
    if(document.getElementById("2pLargeStraight").getAttribute("disabled")== null){
        populateScoreCardLargeStraight("2pLargeStraight");
    }
    //Chance
    if(document.getElementById("2pChance").getAttribute("disabled") == null){
        populateScoreCardChance("2pChance");        
    }
    //Yatzy
    if(document.getElementById("2pYatzy").getAttribute("disabled") == null){
        populateScoreCardYatzy("2pYatzy");  
    }
}

function disablePlayer1Boxes(){
    disableBoxes1("1p1");
    disableBoxes1("1p2");
    disableBoxes1("1p3");
    disableBoxes1("1p4");
    disableBoxes1("1p5");
    disableBoxes1("1p6");
    disableBoxes1("1pFullHouse")
    disableBoxes1("1pThreeKind");
    disableBoxes1("1pFourKind");
    disableBoxes1("1pSmallStraight");
    disableBoxes1("1pLargeStraight");
    disableBoxes1("1pChance");
    disableBoxes1("1pYatzy");

}


function disablePlayer2Boxes(){
//disable player 2. score boxes when clicked.
        disableBoxes2("2p1");
        disableBoxes2("2p2");
        disableBoxes2("2p3");
        disableBoxes2("2p4");
        disableBoxes2("2p5");
        disableBoxes2("2p6");
        disableBoxes2("2pFullHouse")
        disableBoxes2("2pThreeKind");
        disableBoxes2("2pFourKind");
        disableBoxes2("2pSmallStraight");
        disableBoxes2("2pLargeStraight");
        disableBoxes2("2pChance");
        disableBoxes2("2pYatzy");
    
}




//add if clicked then turn ends.
//puts click event on boxes so they will be disabled.
//calls resetDiceWhenScoreIspicked(); which will reset dice for next player.
//increments turnNum so the turn is finished.
//calls resetRollNum(); so the roll buttons will be enabled again.
function disableBoxes1(boxid:string){
    let box = document.getElementById(boxid);
    box.onclick = function(){
        if(turnNum % 2 ==1 && (<HTMLInputElement>box).value != ""){
            box.setAttribute("disabled", "true");
            // increments turn num so that other players scores will show up.
            resetDiceWhenScoreIsPicked();
            resetRollNum();
            resetPlayer1EnabledScores();
            displayPlayerTurn();
            totalOneThroughSix1();
            checkForBonus("1pTotal","1bonus");
            yatzyBonus("1pYatzy", "1pYatzyBonus");
            totalAllScores("1Score", "player1Score", "player 1: ");
            turnNum++;
        }
    }
}

//////////////////attempt to make a seperate click function to disable scores
//////////////////for both player 1 and player 2.
function disableBoxes2(boxid:string){
    let box = document.getElementById(boxid);
    box.onclick = function(){
        if(turnNum % 2 == 0 && (<HTMLInputElement>box).value != ""){
            box.setAttribute("disabled", "true");
            resetDiceWhenScoreIsPicked();
            resetRollNum();
            resetPlayer2EnabledScores();
            displayPlayerTurn();
            totalOneThroughSix2();
            checkForBonus("2pTotal","2bonus");
            yatzyBonus("2pYatzy", "2pYatzyBonus");
            totalAllScores("2Score", "player2Score", "player 2 : ");
            turnNum++;
        }
    }
}



function makeDiceMovable(){
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
}

//function to reset dice images and values and will be called
//in resetDiceWhenScoreIsPicked.
function resetDice(handId:string, inplayId:string){
    document.getElementById(inplayId).setAttribute("src", "");
    document.getElementById(inplayId).setAttribute("value", "");
    document.getElementById(handId).setAttribute("src", "");
    document.getElementById(handId).setAttribute("value", "");
}
//call reset dice in order to reset dice values at end of turn
// will be called in disableBoxes
function resetDiceWhenScoreIsPicked(){
    resetDice("hand1", "inPlay1");
    resetDice("hand2", "inPlay2");
    resetDice("hand3", "inPlay3");
    resetDice("hand4", "inPlay4");
    resetDice("hand5", "inPlay5"); 
}

function resetPlayer1EnabledScores(){
    let boxes = document.getElementsByClassName("1Score");
    for(var i = 0; i < boxes.length; i++){
        if(boxes[i].getAttribute("disabled") == null){
            (<HTMLInputElement>boxes[i]).value = "";
        }
    }
}

function resetPlayer2EnabledScores(){
    let boxes = document.getElementsByClassName("2Score");
    for(var i = 0; i < boxes.length; i++){
        if(boxes[i].getAttribute("disabled") == null){
            (<HTMLInputElement>boxes[i]).value = "";
        }
    }
}


function displayPlayerTurn(){
    if(playersTurn == 3){
        playersTurn = 1;
    }
    let turn = playersTurn;
    document.getElementById("turn").textContent = turn + "";
    playersTurn++;
}



//totals the 1 -6 score rows for player1.
function totalOneThroughSix1(){
    let bottomScore = parseInt((<HTMLInputElement>document.getElementById("1p1")).value) +
    parseInt((<HTMLInputElement>document.getElementById("1p2")).value) +
    parseInt((<HTMLInputElement>document.getElementById("1p3")).value) +
    parseInt((<HTMLInputElement>document.getElementById("1p4")).value) +
    parseInt((<HTMLInputElement>document.getElementById("1p5")).value) +
    parseInt((<HTMLInputElement>document.getElementById("1p6")).value);

    (<HTMLInputElement>document.getElementById("1pTotal")).value = bottomScore.toString();
    if(isNaN(bottomScore)){
        (<HTMLInputElement>document.getElementById("1pTotal")).value = "";
    }
}

//totals the 1 - 6 score rows for player 2
function totalOneThroughSix2(){
    let bottomScore = parseInt((<HTMLInputElement>document.getElementById("2p1")).value) +
    parseInt((<HTMLInputElement>document.getElementById("2p2")).value) +
    parseInt((<HTMLInputElement>document.getElementById("2p3")).value) +
    parseInt((<HTMLInputElement>document.getElementById("2p4")).value) +
    parseInt((<HTMLInputElement>document.getElementById("2p5")).value) +
    parseInt((<HTMLInputElement>document.getElementById("2p6")).value);

    (<HTMLInputElement>document.getElementById("2pTotal")).value = bottomScore.toString();
    if(isNaN(bottomScore)){
        (<HTMLInputElement>document.getElementById("2pTotal")).value = "";
    }
}

function checkForBonus(totalId, bonusId){
    let total = (<HTMLInputElement>document.getElementById(totalId)).value;
    if(parseInt(total)>=63){
        (<HTMLInputElement>document.getElementById(bonusId)).value = "35";
    }
    else{
        (<HTMLInputElement>document.getElementById(bonusId)).value = "0";

    }
}

function yatzyBonus(yatzyId, yatzyBonusId){
    
    let bonusScore = 0;
    (<HTMLInputElement>document.getElementById(yatzyBonusId)).value = "0";
    let yatzy = (<HTMLInputElement>document.getElementById(yatzyId)).value
    if(yatzy == "50" && yatzyCheck()){
        bonusScore += 100;
        (<HTMLInputElement>document.getElementById(yatzyBonusId)).value = bonusScore.toString();
    } 
    if((<HTMLInputElement>document.getElementById(yatzyBonusId)).value = ""){
        (<HTMLInputElement>document.getElementById(yatzyBonusId)).value = "0";
    }
}


function yatzyCheck():boolean{
let count = 0;
    for(var i = 0; i < inHandScore.length; i++){
        if(inHandScore[0] == inHandScore[i]){
            count++;
        }
    }
    if(count == 5){
        return true;
    }
}
        
/**
 * 
 * @param playerScoreClass class that all the players scores share
 * @param scoreSpan the span tag used to display the players score
 * @param playerNum which player the score belongs too. 
 */
function totalAllScores(playerScoreClass, scoreSpan, playerNum){
    let scores = document.getElementsByClassName(playerScoreClass);
    let total = 0;
    for(var i = 0; i < scores.length; i++){
        if(scores[i].getAttribute("disabled") != null){
            total += parseInt((<HTMLInputElement>scores[i]).value);
        }
    }
    document.getElementById(scoreSpan).innerText = playerNum + total.toString();
}


function displayWinner(){
    document.getElementById("endGame").onclick = function(){
        let scores = document.getElementsByClassName("1Score");
        let total = 0;
        for(var i = 0; i < scores.length; i++){
            if(scores[i].getAttribute("disabled") != null){
                total += parseInt((<HTMLInputElement>scores[i]).value);
            }
        }

        let scores2 = document.getElementsByClassName("2Score");
        let total2 = 0;
        for(var i = 0; i < scores2.length; i++){
            if(scores2[i].getAttribute("disabled") != null){
                total2 += parseInt((<HTMLInputElement>scores2[i]).value);
            }
        }
        if(total > total2){
            alert("player 1 is the winner");
        }
        if(total2 > total){
            alert("player 2 is the winner");
        }
        if(total == total2){
            alert("Tie Game");
        }
        
    }
    
}




