/*$(document).ready(function(){

$("game").hide();
$("#start").on('click', trivia.startGame);
//$(document).on('click' , '.option', trivia.guessChecker);

})
*/

//$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  //})
  
  var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    // questions options and answers data
    questions: {
      q1: 'Who is actually a chef?',
      q2: 'What does Joey love to eat?',
      q3: 'How many times has Ross been divorced?',
      q4: 'How many types of towels does Monica have?',
      q5: "Who stole Monica's thunder after she got engaged?",
      q6: 'Who hates Thanksgiving?',
      q7: "Who thinks they're always the last to find out everything?"
    },
    options: {
      q1: ['Monica', 'Chandler', 'Rachel', 'Ross'],
      q2: ['Fish', 'Apples', 'Oranges', 'Sandwhiches'],
      q3: ['5', '2', '1', '3'],
      q4: ['3', '8', '11', '6'],
      q5: ['Rachel','Phoebe','Emily','Carol'],
      q6: ['Joey','Chandler','Rachel','Ross'],
      q7: ['Ross', 'Phoebe', 'Monica','Chandler']
    },
    answers: {
      q1: 'Monica',
      q2: 'Sandwhiches',
      q3: '3',
      q4: '11',
      q5: 'Rachel',
      q6: 'Chandler',
      q7: 'Phoebe'
    },
    // trivia methods
    // method to initialize game
    startGame: function(){
      // restarting game results
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      // show game section
      $('#game').show();
      
      //  empty last results
      $('#results').html('');
      
      // show timer
      $('#timer').text(trivia.timer);
      
      // remove start button
      $('#start').hide();
  
      $('#remaining-time').show();
      
      // ask first question
      trivia.nextQuestion();
      
    },
    //method to loop through and display questions and options 
    nextQuestion : function(){
      
      // set timer to 20 seconds each question
      trivia.timer = 20;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      // to prevent timer speed up
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      // gets all the questions then indexes the current questions
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      // an array of all the user options for the current question
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // creates all the trivia guess options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      // the time has run out and increment unanswered, run result
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      // if all the questions have been shown end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // adds results of game (correct, incorrect, unanswered) to the page
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        // hide game sction
        $('#game').hide();
        
        // show start button to begin a new game
        $('#start').show();
      }
      
    },
    // method to evaluate the option clicked
    guessChecker : function() {
      
      // timer ID for gameResult setTimeout
      var resultId;
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      // if the text of the option picked matches the answer of the current question, increment correct
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      // else the user picked the wrong option, increment incorrect
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    // method to remove previous question results and options
    guessResult : function(){
      
      // increment to next question set
      trivia.currentSet++;
      
      // remove the options and results
      $('.option').remove();
      $('#results h3').remove();
      
      // begin next question
      trivia.nextQuestion();
       
    }
  
  }
/*function booboo() {
    document.getElementById("game").style.display = "block";
}

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
    const myQuestions = [
      {
        question: "Which of these films belongs to the period known as 'the Disney Renaissance?'",
        answers: {
          a: "Snow White & the Seven Dwarfs",
          b: "Frozen",
          c: "The Little Mermaid",
          d: "The Jungle Book"
        },
        correctAnswer: "c"
      },
      {
        question: "Which of these films is not produced by Disney?",
        answers: {
          a: "Star Wars: The Last Jedi",
          b: "Tron: Legacy",
          c: "Avengers: Endgame",
          d: "How to Train Your Dragon"
        },
        correctAnswer: "d"
      },
      {
        question: "Which character is not a Disney princess?",
        answers: {
          a: "Rapunzel",
          b: "Tiana",
          c: "Vanellope",
          d: "Merida"
        },
        correctAnswer: "c"
      },
      {
        question: "Which animated film has not yet been adapted to live action?",
        answers: {
          a: "Hercules",
          b: "Beauty and the Beast",
          c: "Cinderella",
          d: "Dumbo"
        },
        correctAnswer: "a"
    },
    {
        question: "What is Moana's animal sidekick named?",
        answers: {
            a: "Iago",
            b: "Scrump",
            c: "Pua",
            d: "Tamatoa"
        },
        correctAnswer: "c"
        },
        {
        question: "Which movie features the song 'When You wish Upon a Star?'",
        answers: {
            a: "Pinocchio",
            b: "Peter Pan",
            c: "Robin Hood",
            d: "Alice in Wonderland"
            },
            correctAnswer: "a"
        },
        {
            question: "Which Disney/Pixar film has NOT won the Best Animated feature Oscar?",
            answers: {
              a: "Coco",
              b: "Brave",
              c: "Incredibles 2",
              d: "Finding Nemo"
            },
            correctAnswer: "c"
          }
      
    ];

    (function() {
        function buildQuiz() {
          // we'll need a place to store the HTML output
          const output = [];
      
          // for each question...
          myQuestions.forEach((currentQuestion, questionNumber) => {
            // we'll want to store the list of answer choices
            const answers = [];
      
            // and for each available answer...
            for (letter in currentQuestion.answers) {
              // ...add an HTML radio button
              answers.push(
                `<label>
                  <input type="radio" name="question${questionNumber}" value="${letter}">
                  ${letter} :
                  ${currentQuestion.answers[letter]}
                </label>`
              );
            }
      
            // add this question and its answers to the output
            output.push(
              `<div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>`
            );
          });
      
          // finally combine our output list into one string of HTML and put it on the page
          quizContainer.innerHTML = output.join("");
        }
      
        function showResults() {
          // gather answer containers from our quiz
          const answerContainers = quizContainer.querySelectorAll(".answers");
      
          // keep track of user's answers
          let numCorrect = 0;
      
          // for each question...
          myQuestions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      
            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
              // add to the number of correct answers
              numCorrect++;
      
              // color the answers green
              answerContainers[questionNumber].style.color = "lightgreen";
            } else {
              // if answer is wrong or blank
              // color the answers red
              answerContainers[questionNumber].style.color = "red";
            }
          });
      
          // show number of correct answers out of total
          resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
        }
      
        // display quiz right away
        buildQuiz();
      
        // on submit, show results
        submitButton.addEventListener("click", showResults);
      })();



function newFunction() {
    return "submit";
}
/*
var countDown = 80;
var x = setInterval(function()) {


function countDown(sec, timer) {
    var timeRunning = document.getElementById(timer);
    timeRunning = "+sec+";
    sec--;
    var numbers = setTimeout('countDown('+sec+', "'+timer+'")', 80000);
    countDown(80, "timer");*/




