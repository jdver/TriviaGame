$(document).ready(function(){

$("game").hide();
$("#start").on('click', trivia.startGame);
//$(document).on('click' , '.option', trivia.guessChecker);

function countDown(sec, timer) {
    var timeRunning = document.getElementById(timer);
    timeRunning = "+sec+";
    sec--;
    var numbers = setTimeout('countDown('+sec+', "'+timer+'")', 80000);
    countDown(80, "timer");

}

var trivia = {

}
