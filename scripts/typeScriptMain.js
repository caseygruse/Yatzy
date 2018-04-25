window.onload = function () {
    var rollNum = 1;
    firstRoll();
    startPlaying();
};
function startPlaying() {
    document.getElementById("letsPlay").addEventListener("click", function () {
        var player1 = document.getElementById("player1Name").value;
        var player2 = document.getElementById("player2Name").value;
        document.getElementById("player1").textContent = player1;
        document.getElementById("player2").textContent = player2;
    });
}
function firstRoll() {
    var imagesValue = createImageValueArray();
    var imageArray = createImageArray();
    document.getElementById("roll").onclick = function () {
        for (var i = 0; i < 5; i++) {
            var randValue = imagesValue[Math.floor(Math.random() * 6)];
            document.getElementsByTagName("img")[i].setAttribute("value", randValue);
            var giveImgValue = parseInt(document.getElementsByTagName("img")[i].getAttribute("value"));
            document.getElementsByTagName("img")[i].setAttribute("src", imageArray[giveImgValue - 1]);
        }
    };
}
function createImageArray() {
    var images = ["dice/1.png", "dice/2.png", "dice/3.png", "dice/4.png", "dice/5.png", "dice/6.png"];
    var imageValue = [1, 2, 3, 4, 5, 6];
    return images;
}
function createImageValueArray() {
    var imageValue = ["1", "2", "3", "4", "5", "6"];
    return imageValue;
}
