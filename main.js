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
function display(playerHand, dealerHand) {
  console.log(`Player: ${playerHand[0].weight} ${playerHand[0].suit} - ${playerHand[1].weight} ${playerHand[1].suit}`);
  console.log(`Dealer: ${dealerHand[0].weight} ${dealerHand[0].suit} - ${dealerHand[1].weight} ${dealerHand[1].suit}`);
}

/**
 * gets the sum of player hand and dealer hand
 * @param {Array} playerHand cards
 * @param {Array} dealerHand cards
 * @returns {Array} 
 */
function getTotal(playerHand, dealerHand) {
  // const playerTotal = playerHand.reduce((acc, curr) => {
  //   console.log(curr);
  //   if(curr == Object) {
  //     acc + curr.weight
  //   }
  // }, 0);
  // const dealerTotal = dealerHand.reduce((acc, curr) => {
  //   console.log(curr);
  //   if(curr == Object) {
  //     acc + curr.weight
  //   }
  // }, 0);
  const playerTotal = playerHand[0].weight + playerHand[1].weight;
  const dealerTotal = dealerHand[0].weight + dealerHand[1].weight;
  return [playerTotal, dealerTotal]
}

/**
 * console.logs total
 * @param {Array} playerHand 
 * @param {Array} dealerHand 
 */
function displayTotal(playerHand, dealerHand) {
  console.log(`Player: ${playerHand}`);
  console.log(`Dealer: ${dealerHand}`);
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
    const j = Math.floor(Math.random() * (i + 1));
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
function getWinner(player, dealer) {
  if (player === dealer) return console.log('TIE!');
  return (dealer > player) ? console.log('Dealer Wins!') : console.log('Player Wins!');
}

// MAIN
/**
 * gameplay function
 */
function game() {
  console.log('Welcome to BlackJack');
  let cardDealt = 0;
  const deck = createDeck();
  const playerHand = deal(deck, cardDealt);
  cardDealt = playerHand[2]
  const dealerHand = deal(deck, cardDealt);
  cardDealt = dealerHand[2];
  display(playerHand, dealerHand);
  const [playerTotal, dealerTotal] = getTotal(playerHand, dealerHand);
  displayTotal(playerTotal, dealerTotal);
  getWinner(playerTotal, dealerTotal);
  round();
}

/**
 * awaits user input to continue playing or quit
 */
function round() {
  rl.question(`Press A-Z or 2-0 to keep playing, '1' to stop: `, (answer) => {
    if(answer === '1') {
      // stop playing
      console.log('you quit the game');
      rl.close();
      return;
    } 
    game();
  });
}

round();


// skrt
//
