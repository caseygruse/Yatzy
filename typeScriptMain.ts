window.onload = function(){
    startPlaying();
    firstRoll();
    
    let rollNum:number = 1;
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

function firstRoll():void{
    let images = createImageArray();
    document.getElementById("roll").onclick = function(){
        for(var i = 0; i < 5; i++){
            let randImage:string =images[Math.floor(Math.random() * 6)]
            //let randTag:string = "slot"+i;
            document.getElementsByTagName("img")[i].setAttribute("src", randImage);
        }
    }
}






function createImageArray():string[]{
    let images = ["dice/1.png", "dice/2.png", "dice/3.png", "dice/4.png", "dice/5.png", "dice/6.png"];
    return images;
        
}

    


