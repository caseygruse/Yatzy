window.onload = function () {
    startPlaying();
};
function startPlaying() {
    //let player1:string = (<HTMLInputElement>document.getElementById("player1Name")).value;
    document.getElementById("letsPlay").addEventListener("click", function () {
        var player1 = document.getElementById("player1Name").value;
        var player2 = document.getElementById("player2Name").value;
        document.getElementById("player1").textContent = player1;
        document.getElementById("player1").textContent = player2;
    });
}
