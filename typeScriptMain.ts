window.onload = function(){
    let rollNum:number = 1;
    
    firstRoll();
    
    startPlaying();
    
    
    
    
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
 * hooks a click event to roll which will roll all 5 dice.
 */
function firstRoll():void{
    //let images = createImageArray();
    let imagesValue = createImageValueArray();
    let imageArray = createImageArray();
    document.getElementById("roll").onclick = function(){
        for(var i = 0; i < 5; i++){
            let randValue:string = imagesValue[Math.floor(Math.random() * 6)]
            //let randImage:string =images[Math.floor(Math.random() * 6)]
            //let randTag:string = "slot"+i;
            //document.getElementsByTagName("img")[i].setAttribute("src", randImage);
            document.getElementsByTagName("img")[i].setAttribute("value", randValue);
            let giveImgValue = parseInt(document.getElementsByTagName("img")[i].getAttribute("value"))
            document.getElementsByTagName("img")[i].setAttribute("src", imageArray[giveImgValue-1])
        }
        
        
    }  
}
/**
 * retrieves value from img tags so the correct dice number can be placed
 * in the right positions/
 * the 5 in the loop is the number of imgTags
 */

/**
 * puts the dice pictures into the image tags where their corresponding numbers are.
 */




//creates the image array.
function createImageArray():string[]{
    let images = ["dice/1.png", "dice/2.png", "dice/3.png", "dice/4.png", "dice/5.png", "dice/6.png"];
    let imageValue = [1, 2, 3, 4, 5, 6];
    return images;    
}

function createImageValueArray():string[]{
    let imageValue = ["1", "2", "3", "4", "5", "6"];
    return imageValue;    
}

    



// function images(src:string, value:string):void{
//     let pictureSlots = document.getElementById("imgList")
//     var myImage = new Image(100, 100);
//     myImage.src = src;
//     myImage.nodeValue = value;
//     pictureSlots.appendChild(myImage);
// }

// function createImageTagArray(){
//     images("1.png", "1");
// }