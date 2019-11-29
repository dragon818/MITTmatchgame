/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

/*
* Shuffle the cards and set a card in the `#next-card` element
*  - This card should be replaced/updated whenever a player find the correct match
*  - Once a match has been made, the symbol with a new symbols
*  - Symbols cannot repeat more than once
*  - All the symbols on the board must be used 1 time

/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol
*  - Check to see if this card matches the card displayed in the `next-match` element
*    + if the cards do match, lock the open card into the match position and update the next-card
*    + if the cards do not match, hide the card's symbol
*    + increment the move counter and display it on the page each time a card is revealed
*    + if all cards have matched, display an alert indicating the user has won, include their final score
*/

const refreshRight = function () {
  let newCardArray = shuffle(tempeArray);
  console.log(newCardArray);
  for (let i = 0; i < newCardArray.length; i++) {
    card[i].className = newCardArray[i];
  }

}
const cards = document.querySelector("#cards");
const restart = document.querySelector(".restart");
const nextCard = document.querySelector("#next-card");
let clickTimes = 0;
let j = 0;
const matchArray = [];
let scoreStr = document.querySelector("#score").innerHTML;
let score = parseInt(scoreStr);
// get all cards in an array
const allCardsArray = [];
const card = cards.querySelectorAll(".fas");
card.forEach(ele => allCardsArray.push(ele.className));
nextCard.firstElementChild.className = allCardsArray[j];
let tempeArray = [...allCardsArray];
refreshRight();

cards.addEventListener("click", function(e) {
  matchArray[0] = nextCard.firstElementChild.className;
  const clickedCard = e.target.firstElementChild.className;
  clickTimes++;

  if (
    e.target.classList.contains("card") &&
    !e.target.classList.contains("show") &&
    clickTimes < 2
  ) {
    e.target.classList.add("show");
    matchArray[1] = clickedCard;
    
    document.querySelector("#score").innerHTML = ++score;
  
    setTimeout(function() {
      if (matchArray[0] === matchArray[1]) {
        e.target.classList.add("matched");
        // give new nextcard and  new cards
        nextCard.firstElementChild.className = allCardsArray[++j];
      } else {
        e.target.classList.remove("show");
      }
      if (document.querySelectorAll('.matched').length === allCardsArray.length) {
        nextCard.firstElementChild.className = allCardsArray[j-1];
        Swal.fire(
          'You found them!',
          `You took ${score} moves`
        )
      }
      clickTimes = 0;
    }, 1000);
  }
});

restart.addEventListener("click", function(eve) {
  console.log(eve.target);
  if (eve.target.classList.contains('fa-redo') || eve.target.textContent === 'Restart Game') {
    document.querySelector('#score').textContent = 0;
    score = 0;
    nextCard.firstElementChild.className = allCardsArray[0];
    const cardList = cards.querySelectorAll('.card');
    cardList.forEach(ele => ele.className = 'card');
    refreshRight();
  }
});
