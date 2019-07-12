// readline logic
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// variables
const suits = ['♠', '♣', '♥', '♦'];
const weights = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];

// helper functions
/**
 * Deals cards to player and dealer
 * @param {Array} deck 
 * @param {Number} cardDealt 
 * @returns {Array} cards 
 */
function deal(deck, cardDealt) {
  let returnedCards = [];
  returnedCards[0] = deck[cardDealt];
  cardDealt++;
  returnedCards[1] = deck[cardDealt];
  cardDealt++;
  returnedCards[2] = cardDealt;
  return returnedCards;
}

/**
 * Displays the cards in player and dealer's hands
 * @param {Array} playerHand 
 * @param {Array} dealerHand 
 */
function displayHands(playerHand, dealerHand) {
  console.log(`Player Hand: ${playerHand[0].weight} ${playerHand[0].suit} - ${playerHand[1].weight} ${playerHand[1].suit}`);
  console.log(`Dealer Hand: ${dealerHand[0].weight} ${dealerHand[0].suit} - ${dealerHand[1].weight} ${dealerHand[1].suit}`);
  let returnArray = [];
  returnArray[0] = playerHand[0];
  returnArray[1] = playerHand[1];
  returnArray[2] = dealerHand[0];
  returnArray[3] = dealerHand[1];
  return returnArray;
}

/**
 * gets the sum of player hand and dealer hand
 * @param {Array} playerHand cards
 * @param {Array} dealerHand cards
 * @returns {Array} 
 */
function getTotal(func) {
  let playerHand = [];
  let dealerHand = [];
  playerHand[0] = func[0];
  playerHand[1] = func[1];
  dealerHand[0] = func[2];
  dealerHand[1] = func[3];
  const playerTotal = playerHand.reduce((acc, curr) => acc + curr.weight, 0);
  const dealerTotal = dealerHand.reduce((acc, curr) => acc + curr.weight, 0);
  return [playerTotal, dealerTotal]
}

/**
 * console.logs total
 * @param {Array} playerHand 
 * @param {Array} dealerHand 
 */
function displayTotal(func) {
  const playerHand = func[0];
  const dealerHand = func[1];
  console.log(`Player Total: ${playerHand}`);
  console.log(`Dealer Total: ${dealerHand}`);
  let returnArray = [];
  returnArray[0] = playerHand;
  returnArray[1] = dealerHand;
  return returnArray;
}

/**
 * creates deck
 * @returns {Array} shuffled deck
 */
function createDeck() {
  let deck = [];
  let deckIndex = 0;
  for (let i = 0; i < weights.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      deck[deckIndex] = ({ suit: suits[j], weight: weights[i] });
      deckIndex++;
    } 
  }
  return shuffle(deck);
}

/**
 * shuffles arrays of cards (deck)
 * @param {Array} cards 
 * @returns {Array} shuffled cards
 */
function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * cards.length);
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

/**
 * 
 * @param {Number} player 
 * @param {Number} dealer 
 * @returns {String} winner announcement
 */
function getWinner(func) {
  const player = func[0];
  const dealer = func[1];
  if (player === dealer) return console.log('TIE!');
  return (dealer > player) ? console.log('Dealer Wins!') : console.log('Player Wins!');
}

// MAIN
/**
 * gameplay function
 */
async function game() {
  console.log('Welcome to BlackJack');
  let cardDealt = 0;
  const deck = createDeck();
  const playerHand = deal(deck, cardDealt);
  cardDealt = playerHand[2]
  const dealerHand = deal(deck, cardDealt);
  cardDealt = dealerHand[2];
  getWinner(displayTotal(getTotal(displayHands(playerHand, dealerHand))));
  // TODO: eliminate circular dependency
  round();
}

/**
 * awaits user input to continue playing or quit
 */
function round() {
  rl.question(`Press A-Z or 2-0 to play, '1' to stop: `, (answer) => {
    if(answer === '1') {
      // stop playing
      console.log('you quit the game');
      rl.close();
      return;
    } 
    // TODO: eliminate circular dependency
    game();
  });
}

round();


// skrt
//
