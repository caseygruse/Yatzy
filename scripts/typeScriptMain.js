var rollNum = 1;
var turnNum = 1;
var playersTurn = 1;
window.onload = function () {
    firstRoll();
    secondRollButtonClick("roll2");
    displayPlayerTurn();
    startPlaying();
    disablePlayer1Boxes();
    disablePlayer2Boxes();
    displayWinner();
};
function startPlaying() {
    document.getElementById("letsPlay").addEventListener("click", function () {
        var player1 = document.getElementById("player1Name").value;
        var player2 = document.getElementById("player2Name").value;
        document.getElementById("player1").textContent = player1;
        document.getElementById("player2").textContent = player2;
    });
}
var inHandScore = [0, 0, 0, 0, 0];
function firstRoll() {
    var imagesValue = createImageValueArray();
    var imageArray = createImageArray();
    document.getElementById("roll").onclick = function () {
        makeDiceMovable();
        for (var i = 0; i < 5; i++) {
            var randValue = imagesValue[Math.floor(Math.random() * 6)];
            document.getElementsByTagName("img")[i].setAttribute("value", randValue);
            var giveImgValue = parseInt(document.getElementsByTagName("img")[i].getAttribute("value"));
            document.getElementsByTagName("img")[i].setAttribute("src", imageArray[giveImgValue - 1]);
        }
        rollNum++;
        if (rollNum > 1) {
            document.getElementById("roll").setAttribute("disabled", "true");
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
            inHandScoreArray();
            if (turnNum % 2 == 1) {
                PopulatePlayer1Score();
            }
            if (turnNum % 2 == 0) {
                PopulatePlayer2Score();
            }
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
function secondRollButtonClick(buttonId) {
    document.getElementById(buttonId).onclick = function () {
        if (document.getElementById("roll").disabled == true) {
            secondRoll("inPlay1");
            secondRoll("inPlay2");
            secondRoll("inPlay3");
            secondRoll("inPlay4");
            secondRoll("inPlay5");
            rollNum++;
        }
        if (rollNum > 3) {
            document.getElementById("roll2").setAttribute("disabled", "true");
        }
    };
}
function inHandScoreArray() {
    var inHandDice = document.getElementsByClassName("yourHand");
    for (var i = 0; i < inHandDice.length; i++) {
        var dice = inHandDice[i];
        var diceValueInt = parseInt(dice.getAttribute("value"));
        if (isNaN(diceValueInt)) {
            diceValueInt = 0;
        }
        inHandScore[i] = diceValueInt;
    }
}
function resetRollNum() {
    rollNum = 1;
    document.getElementById("roll").disabled = false;
    document.getElementById("roll2").disabled = false;
}
function populateScoreCardNums(inputId, scoreType) {
    inHandScore.sort();
    var score = 0;
    if (inHandScore.indexOf(scoreType) != -1) {
        for (var i = 0; i < inHandScore.length; i++) {
            if (inHandScore[i] == scoreType) {
                score += scoreType;
            }
        }
        var stringScore = score.toString();
        document.getElementById(inputId).value = stringScore;
    }
    else {
        document.getElementById(inputId).value = "0";
    }
}
function populateScoreCardFullHouse(inputId) {
    inHandScore.sort();
    if (inHandScore[0] != 0 && inHandScore[0] == inHandScore[1] && inHandScore[1] == inHandScore[2] && inHandScore[3] == inHandScore[4] ||
        inHandScore[0] != 0 && inHandScore[0] == inHandScore[1] && inHandScore[2] == inHandScore[3] && inHandScore[2] == inHandScore[4]) {
        document.getElementById(inputId).value = "25";
    }
    else {
        document.getElementById(inputId).value = "0";
    }
}
function populateScoreCardThreeOfAKind(inputId) {
    inHandScore.sort();
    document.getElementById(inputId).value = "0";
    for (var i = 0; i < inHandScore.length - 2; i++) {
        if (inHandScore[i] == 0) {
            i++;
        }
        if (inHandScore[i] == inHandScore[i + 1] && inHandScore[i] == inHandScore[i + 2]) {
            var score = inHandScore[0] + inHandScore[1] + inHandScore[2] + inHandScore[3] + inHandScore[4];
            document.getElementById(inputId).value = score.toString();
            break;
        }
    }
}
function populateScoreCardFourOfAKind(inputId) {
    inHandScore.sort();
    document.getElementById(inputId).value = "0";
    for (var i = 0; i < inHandScore.length - 3; i++) {
        if (inHandScore[0] == 0) {
            i++;
        }
        if (inHandScore[i] == inHandScore[i + 1] && inHandScore[i] == inHandScore[i + 2] &&
            inHandScore[i] == inHandScore[i + 3]) {
            var score = inHandScore[0] + inHandScore[1] + inHandScore[2] + inHandScore[3] + inHandScore[4];
            document.getElementById(inputId).value = score.toString();
        }
    }
}
function populateScoreCardSmallStraight(inputId) {
    inHandScore.sort();
    for (var i = 0; i < inHandScore.length - 3; i++) {
        if (inHandScoreArray[0] == 0) {
            i++;
        }
        if (inHandScore[i] + 1 == inHandScore[i + 1] && inHandScore[i] + 2 == inHandScore[i + 2] &&
            inHandScore[i] + 3 == inHandScore[i + 3]) {
            document.getElementById(inputId).value = "30";
        }
        else {
            document.getElementById(inputId).value = "0";
        }
    }
}
function populateScoreCardLargeStraight(inputId) {
    inHandScore.sort();
    for (var i = 0; i < inHandScore.length - 4; i++) {
        if (inHandScore[i] == 0) {
            document.getElementById(inputId).value = "0";
        }
        else if (inHandScore[i] + 1 == inHandScore[i + 1] && inHandScore[i] + 2 == inHandScore[i + 2] &&
            inHandScore[i] + 3 == inHandScore[i + 3] && inHandScore[i] + 4 == inHandScore[i + 4]) {
            document.getElementById(inputId).value = "40";
        }
    }
}
function populateScoreCardChance(inputId) {
    var score = 0;
    for (var i = 0; i < inHandScore.length; i++) {
        score += inHandScore[i];
    }
    document.getElementById(inputId).value = score.toString();
}
function populateScoreCardYatzy(inputId) {
    var count = 0;
    for (var i = 0; i < inHandScore.length; i++) {
        if (inHandScore[0] == inHandScore[i]) {
            count++;
        }
    }
    if (count == 5) {
        document.getElementById(inputId).value = "50";
    }
    else {
        document.getElementById(inputId).value = "0";
    }
}
function PopulatePlayer1Score() {
    if (document.getElementById("1p1").getAttribute("disabled") == null) {
        populateScoreCardNums("1p1", 1);
    }
    if (document.getElementById("1p2").getAttribute("disabled") == null) {
        populateScoreCardNums("1p2", 2);
    }
    if (document.getElementById("1p3").getAttribute("disabled") == null) {
        populateScoreCardNums("1p3", 3);
    }
    if (document.getElementById("1p4").getAttribute("disabled") == null) {
        populateScoreCardNums("1p4", 4);
    }
    if (document.getElementById("1p5").getAttribute("disabled") == null) {
        populateScoreCardNums("1p5", 5);
    }
    if (document.getElementById("1p6").getAttribute("disabled") == null) {
        populateScoreCardNums("1p6", 6);
    }
    if (document.getElementById("1pFullHouse").getAttribute("disabled") == null) {
        populateScoreCardFullHouse("1pFullHouse");
    }
    if (document.getElementById("1pThreeKind").getAttribute("disabled") == null) {
        populateScoreCardThreeOfAKind("1pThreeKind");
    }
    if (document.getElementById("1pFourKind").getAttribute("disabled") == null) {
        populateScoreCardFourOfAKind("1pFourKind");
    }
    if (document.getElementById("1pSmallStraight").getAttribute("disabled") == null) {
        populateScoreCardSmallStraight("1pSmallStraight");
    }
    if (document.getElementById("1pLargeStraight").getAttribute("disabled") == null) {
        populateScoreCardLargeStraight("1pLargeStraight");
    }
    if (document.getElementById("1pChance").getAttribute("disabled") == null) {
        populateScoreCardChance("1pChance");
    }
    if (document.getElementById("1pYatzy").getAttribute("disabled") == null) {
        populateScoreCardYatzy("1pYatzy");
    }
}
function PopulatePlayer2Score() {
    if (document.getElementById("2p1").getAttribute("disabled") == null) {
        populateScoreCardNums("2p1", 1);
    }
    if (document.getElementById("2p2").getAttribute("disabled") == null) {
        populateScoreCardNums("2p2", 2);
    }
    if (document.getElementById("2p3").getAttribute("disabled") == null) {
        populateScoreCardNums("2p3", 3);
    }
    if (document.getElementById("2p4").getAttribute("disabled") == null) {
        populateScoreCardNums("2p4", 4);
    }
    if (document.getElementById("2p5").getAttribute("disabled") == null) {
        populateScoreCardNums("2p5", 5);
    }
    if (document.getElementById("2p6").getAttribute("disabled") == null) {
        populateScoreCardNums("2p6", 6);
    }
    if (document.getElementById("2pFullHouse").getAttribute("disabled") == null) {
        populateScoreCardFullHouse("2pFullHouse");
    }
    if (document.getElementById("2pThreeKind").getAttribute("disabled") == null) {
        populateScoreCardThreeOfAKind("2pThreeKind");
    }
    if (document.getElementById("2pFourKind").getAttribute("disabled") == null) {
        populateScoreCardFourOfAKind("2pFourKind");
    }
    if (document.getElementById("2pSmallStraight").getAttribute("disabled") == null) {
        populateScoreCardSmallStraight("2pSmallStraight");
    }
    if (document.getElementById("2pLargeStraight").getAttribute("disabled") == null) {
        populateScoreCardLargeStraight("2pLargeStraight");
    }
    if (document.getElementById("2pChance").getAttribute("disabled") == null) {
        populateScoreCardChance("2pChance");
    }
    if (document.getElementById("2pYatzy").getAttribute("disabled") == null) {
        populateScoreCardYatzy("2pYatzy");
    }
}
function disablePlayer1Boxes() {
    disableBoxes1("1p1");
    disableBoxes1("1p2");
    disableBoxes1("1p3");
    disableBoxes1("1p4");
    disableBoxes1("1p5");
    disableBoxes1("1p6");
    disableBoxes1("1pFullHouse");
    disableBoxes1("1pThreeKind");
    disableBoxes1("1pFourKind");
    disableBoxes1("1pSmallStraight");
    disableBoxes1("1pLargeStraight");
    disableBoxes1("1pChance");
    disableBoxes1("1pYatzy");
}
function disablePlayer2Boxes() {
    disableBoxes2("2p1");
    disableBoxes2("2p2");
    disableBoxes2("2p3");
    disableBoxes2("2p4");
    disableBoxes2("2p5");
    disableBoxes2("2p6");
    disableBoxes2("2pFullHouse");
    disableBoxes2("2pThreeKind");
    disableBoxes2("2pFourKind");
    disableBoxes2("2pSmallStraight");
    disableBoxes2("2pLargeStraight");
    disableBoxes2("2pChance");
    disableBoxes2("2pYatzy");
}
function disableBoxes1(boxid) {
    var box = document.getElementById(boxid);
    box.onclick = function () {
        if (turnNum % 2 == 1 && box.value != "") {
            box.setAttribute("disabled", "true");
            resetDiceWhenScoreIsPicked();
            resetRollNum();
            resetPlayer1EnabledScores();
            displayPlayerTurn();
            totalOneThroughSix1();
            checkForBonus("1pTotal", "1bonus");
            yatzyBonus("1pYatzy", "1pYatzyBonus");
            totalAllScores("1Score", "player1Score", "player 1: ", "1bonus");
            turnNum++;
        }
    };
}
function disableBoxes2(boxid) {
    var box = document.getElementById(boxid);
    box.onclick = function () {
        if (turnNum % 2 == 0 && box.value != "") {
            box.setAttribute("disabled", "true");
            resetDiceWhenScoreIsPicked();
            resetRollNum();
            resetPlayer2EnabledScores();
            displayPlayerTurn();
            totalOneThroughSix2();
            checkForBonus("2pTotal", "2bonus");
            yatzyBonus("2pYatzy", "2pYatzyBonus");
            totalAllScores("2Score", "player2Score", "player 2 : ", "2bonus");
            turnNum++;
        }
    };
}
function makeDiceMovable() {
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
}
function resetDice(handId, inplayId) {
    document.getElementById(inplayId).setAttribute("src", "");
    document.getElementById(inplayId).setAttribute("value", "");
    document.getElementById(handId).setAttribute("src", "");
    document.getElementById(handId).setAttribute("value", "");
}
function resetDiceWhenScoreIsPicked() {
    resetDice("hand1", "inPlay1");
    resetDice("hand2", "inPlay2");
    resetDice("hand3", "inPlay3");
    resetDice("hand4", "inPlay4");
    resetDice("hand5", "inPlay5");
}
function resetPlayer1EnabledScores() {
    var boxes = document.getElementsByClassName("1Score");
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].getAttribute("disabled") == null) {
            boxes[i].value = "";
        }
    }
}
function resetPlayer2EnabledScores() {
    var boxes = document.getElementsByClassName("2Score");
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].getAttribute("disabled") == null) {
            boxes[i].value = "";
        }
    }
}
function displayPlayerTurn() {
    if (playersTurn == 3) {
        playersTurn = 1;
    }
    var turn = playersTurn;
    document.getElementById("turn").textContent = turn + "";
    playersTurn++;
}
function totalOneThroughSix1() {
    var bottomScore = parseInt(document.getElementById("1p1").value) +
        parseInt(document.getElementById("1p2").value) +
        parseInt(document.getElementById("1p3").value) +
        parseInt(document.getElementById("1p4").value) +
        parseInt(document.getElementById("1p5").value) +
        parseInt(document.getElementById("1p6").value);
    document.getElementById("1pTotal").value = bottomScore.toString();
    if (isNaN(bottomScore)) {
        document.getElementById("1pTotal").value = "";
    }
}
function totalOneThroughSix2() {
    var bottomScore = parseInt(document.getElementById("2p1").value) +
        parseInt(document.getElementById("2p2").value) +
        parseInt(document.getElementById("2p3").value) +
        parseInt(document.getElementById("2p4").value) +
        parseInt(document.getElementById("2p5").value) +
        parseInt(document.getElementById("2p6").value);
    document.getElementById("2pTotal").value = bottomScore.toString();
    if (isNaN(bottomScore)) {
        document.getElementById("2pTotal").value = "";
    }
}
function checkForBonus(totalId, bonusId) {
    var total = document.getElementById(totalId).value;
    if (parseInt(total) >= 63) {
        document.getElementById(bonusId).value = "35";
    }
    else {
        document.getElementById(bonusId).value = "0";
    }
}
function yatzyBonus(yatzyId, yatzyBonusId) {
    var bonusScore = 0;
    document.getElementById(yatzyBonusId).value = "0";
    var yatzy = document.getElementById(yatzyId).value;
    if (yatzy == "50" && yatzyCheck()) {
        bonusScore += 100;
        document.getElementById(yatzyBonusId).value = bonusScore.toString();
    }
    if (document.getElementById(yatzyBonusId).value = "") {
        document.getElementById(yatzyBonusId).value = "0";
    }
}
function yatzyCheck() {
    var count = 0;
    for (var i = 0; i < inHandScore.length; i++) {
        if (inHandScore[0] == inHandScore[i]) {
            count++;
        }
    }
    if (count == 5) {
        return true;
    }
}
function totalAllScores(playerScoreClass, scoreSpan, playerNum, bonusId) {
    var scores = document.getElementsByClassName(playerScoreClass);
    var total = 0;
    var bonus = parseInt(document.getElementById(bonusId).value);
    for (var i = 0; i < scores.length; i++) {
        if (scores[i].getAttribute("disabled") != null) {
            total += parseInt(scores[i].value);
        }
    }
    total += bonus;
    document.getElementById(scoreSpan).innerText = playerNum + total.toString();
}
function displayWinner() {
    document.getElementById("endGame").onclick = function () {
        var scores = document.getElementsByClassName("1Score");
        var total = 0;
        for (var i = 0; i < scores.length; i++) {
            if (scores[i].getAttribute("disabled") != null) {
                total += parseInt(scores[i].value);
            }
        }
        var scores2 = document.getElementsByClassName("2Score");
        var total2 = 0;
        for (var i = 0; i < scores2.length; i++) {
            if (scores2[i].getAttribute("disabled") != null) {
                total2 += parseInt(scores2[i].value);
            }
        }
        if (total > total2) {
            alert("player 1 is the winner");
        }
        if (total2 > total) {
            alert("player 2 is the winner");
        }
        if (total == total2) {
            alert("Tie Game");
        }
    };
}
