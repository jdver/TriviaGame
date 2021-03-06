
$(document).ready(function () {
  // button and click controls
  // $('#remaining-time').hide()
  document.querySelector('#remaining-time').style.display = 'none'
  $('#start').on('click', trivia.startGame)
  $(document).on('click', '.option', trivia.guessChecker)
})

// holds our trivia variable and its various properties
var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId: '',
  // question and answer array
  questions: {
    q1: "Which of these films belongs to the period known as 'the Disney Renaissance?'",
    q2: 'Which of these films is not produced by Disney?',
    q3: 'Which character is not a Disney princess?',
    q4: 'Which animated film has not yet been adapted to live action?',
    q5: "What is Moana's animal sidekick named?",
    q6: "Which movie features the song 'When You wish Upon a Star?'",
    q7: 'Which Disney/Pixar film has NOT won the Best Animated feature Oscar?'
  },
  options: {
    q1: ['Snow White & the Seven Dwarfs', 'Frozen', 'The Little Mermaid', 'The Jungle Book'],
    q2: ['Star Wars: The Last Jedi', 'Tron: Legacy', 'Avengers: Endgame', 'How to Train Your Dragon'],
    q3: ['Rapunzel', 'Tiana', 'Vanellope', 'Merida'],
    q4: ['Hercules', 'Beauty and the Beast', 'Cinderella', 'Dumbo'],
    q5: ['Iago', 'Scrump', 'Pua', 'Tamatoa'],
    q6: ['Pinocchio', 'Peter Pan', 'Robin Hood', 'Alice in Wonderland'],
    q7: ['Coco', 'Brave', 'Incredibles 2', 'Finding Nemo']
  },
  answers: {
    q1: 'The Little Mermaid',
    q2: 'How to Train Your Dragon',
    q3: 'Vanellope',
    q4: 'Hercules',
    q5: 'Pua',
    q6: 'Pinocchio',
    q7: 'Incredibles 2'
  },

  // function to start the game
  startGame: function () {
    trivia.currentSet = 0
    trivia.correct = 0
    trivia.incorrect = 0
    trivia.unanswered = 0
    clearInterval(trivia.timerId)

    // display
    $('#game').show()

    //  display results
    $('#results').html('')

    $('#timer').text(trivia.timer)

    // hide button
    $('#start').hide()

    $('#remaining-time').show()

    trivia.nextQuestion()
  },

  // function for going through our questions
  nextQuestion: function () {
    trivia.timer = 12
    $('#timer').removeClass('last-seconds')
    $('#timer').text(trivia.timer)

    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000)
    }

    var questionContent = Object.values(trivia.questions)[trivia.currentSet]
    $('#question').text(questionContent)

    // array
    var questionOptions = Object.values(trivia.options)[trivia.currentSet]

    // displays the options
    $.each(questionOptions, function (index, key) {
      $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'))
    })
  },
  // how we decrement timer and record non-answers
  timerRunning: function () {
    if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
      $('#timer').text(trivia.timer)
      trivia.timer--
      if (trivia.timer === 4) {
        $('#timer').addClass('last-seconds')
      }
    }
    // if timer reaches 0, add to incorrect total
    else if (trivia.timer === -1) {
      trivia.unanswered++
      trivia.result = false
      clearInterval(trivia.timerId)
      resultId = setTimeout(trivia.guessResult, 1000)
      $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>')
    }
    // if all the questions have been shown end the game, show results
    else if (trivia.currentSet === Object.keys(trivia.questions).length) {
      // appends results to page
      $('#results')
        .html('<h3>Thank you for playing!</h3>' +
          '<p>Correct: ' + trivia.correct + '</p>' +
          '<p>Incorrect: ' + trivia.incorrect + '</p>' +
          '<p>Unaswered: ' + trivia.unanswered + '</p>' +
          '<p>Please play again!</p>')

      // hide
      $('#game').hide()

      // show button again to start new game
      $('#start').show()
    }
  },

  guessChecker: function () {
    // timer ID for gameResult setTimeout/
    var resultId

    // current question and answer
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet]

    // if the text of the option picked matches the answer of the current question, increment correct
    if ($(this).text() === currentAnswer) {
      // button turns green color for correct response
      $(this).addClass('btn-success').removeClass('btn-info')

      trivia.correct++
      clearInterval(trivia.timerId)
      resultId = setTimeout(trivia.guessResult, 1000)
      $('#results').html('<h3>Correct Answer!</h3>')
    } else {
      // button turns red for incorrect answer
      $(this).addClass('btn-danger').removeClass('btn-info')

      trivia.incorrect++
      clearInterval(trivia.timerId)
      resultId = setTimeout(trivia.guessResult, 1000)
      $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>')
    }
  },
  // removes previous results
  guessResult: function () {
    // takes us to next question
    trivia.currentSet++

    // remove the options and results
    $('.option').remove()
    $('#results h3').remove()

    // begin next question
    trivia.nextQuestion()
  }

}
