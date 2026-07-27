const NB_CASES  = 7;
const main_INIT = 5;
const SEUIL_WIN = 40;
const SEUIL_FIN = 10;
const GRENIER   = 13;

const NORD = 'nord';
const SUD  = 'sud';

let gameState = null;
let history   = [];

function initGame() {
  gameState = {
    board: {
      [NORD]: Array(NB_CASES).fill(main_INIT),
      [SUD]:  Array(NB_CASES).fill(main_INIT),
    },
    scores:       { [NORD]: 0, [SUD]: 0 },
    tourCaptures: { [NORD]: 0, [SUD]: 0 },
    current:      NORD,
    over:         false,
    win:          null,
    message:      'Partie démarrée. Au tour de Sud.',
    tour:         1,
  };
  history = [];
  return gameState;
}

function getState()   { return gameState; }
function getHistory() { return history;   }