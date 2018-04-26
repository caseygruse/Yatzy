var rollNum = 1;
window.onload = function () {
    firstRoll();
    secondRollButtonClick();
    startPlaying();
    MoveDice("inPlay1", "hand1");
    MoveDice("inPlay2", "hand2");
    MoveDice("inPlay3", "hand3");
    MoveDice("inPlay4", "hand4");
    MoveDice("inPlay5", "hand5");
    MoveDice("hand1", "inPlay1");
    MoveDice("hand2", "inPlay2");
    MoveDice("hand3", "inPlay3");
    MoveDice("hand4", "inPlay4");
    MoveDice("hand5", "inPlay5");
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
        rollNum++;
        if (rollNum > 1) {
            this.onclick = null;
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
function MoveDice(inPlayId, handId) {
    var inPlayImage = document.getElementById(inPlayId);
    var inHandImage = document.getElementById(handId);
    inPlayImage.addEventListener("click", function () {
        if (inPlayImage.getAttribute("src") != "") {
            inHandImage.setAttribute("src", inPlayImage.getAttribute("src"));
            inHandImage.setAttribute("value", inPlayImage.getAttribute("value"));
            inPlayImage.setAttribute("src", "");
            inPlayImage.setAttribute("value", "0");
        }
    });
}
function secondRoll(inPlayId) {
    var inPlayDice = document.getElementById(inPlayId);
    var imagesValue = createImageValueArray();
    var imageArray = createImageArray();
    if (inPlayDice.getAttribute("value") != "0") {
        var randValue = imagesValue[Math.floor(Math.random() * 6)];
        inPlayDice.setAttribute("value", randValue);
        var giveImgValue = parseInt(inPlayDice.getAttribute("value"));
        inPlayDice.setAttribute("src", imageArray[giveImgValue - 1]);
    }
}
function secondRollButtonClick() {
    document.getElementById("roll2").onclick = function () {
        secondRoll("inPlay1");
        secondRoll("inPlay2");
        secondRoll("inPlay3");
        secondRoll("inPlay4");
        secondRoll("inPlay5");
    };
}
