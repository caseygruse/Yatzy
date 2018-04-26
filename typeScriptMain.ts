let rollNum:number = 1;
window.onload = function(){
   
    firstRoll();
    secondRollButtonClick();
       
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

/**
 * hooks a click event to roll all 5 dice.
 * 
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
            this.onclick = null;
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

function secondRollButtonClick(){
    document.getElementById("roll2").onclick = function(){
    secondRoll("inPlay1");
    secondRoll("inPlay2");
    secondRoll("inPlay3");
    secondRoll("inPlay4");
    secondRoll("inPlay5");
    }
}