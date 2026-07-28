const NB_CASES  = 7;
const graines_INIT = 5;
const SEUIL_WIN = 40;
const SEUIL_FIN = 10;
const GRENIER   = 13;

const NORTH = 'nord';
const SOUTH  = 'sud';

let gameState = null;
let history   = [];

function initGame() {
  gameState = {
    board: {
      [NORTH]: Array(NB_CASES).fill(graines_INIT),
      [SOUTH]:  Array(NB_CASES).fill(graines_INIT),
    },
    scores:       { [NORTH]: 0, [SOUTH]: 0 },
    tourCaptures: { [NORTH]: 0, [SOUTH]: 0 },
    current:      NORTH,
    over:         false,
    winner:          null,
    message:      'Partie démarrée. Au tour de Sud.',
    tour:         1,
  };
  history = [];
  return gameState;
  
}

    const gameStates = {
    board: {
      [NORTH]: Array(NB_CASES).fill(graines_INIT),
      [SOUTH]:  Array(NB_CASES).fill(graines_INIT),
    }}
    console.log(totalAdv(NORTH));
    console.log()

function advert(player){
    return player === NORTH? SOUTH :NORTH;
}

function totalAdv(player){
    return gameStates.board[player].reduce((acc,val) =>acc +val,0);
}
function totalGraines(){
    return totalAdv(NORTH) = totalAdv(SOUTH);
}

function tableSongho(player){
    const adv = advert(player);
    return [...gameStates.board[player],...gameStates.board[adv]];//concatenation simple des deux secction pour en faire  un plateau
}

function BackBoard(songho,player){
    const adv = advert(player);
    return {
        [player] : songho.slice(0,NB_CASES),
        [adv] : songho.slice(NB_CASES),
    };
}

function semer(songho,caseJouer){
    const isGrenier = main > GRENIER;

    let caseActuel = caseJouer;
    let reste = main;
    let DerniereJouer = caseJouer;

    const nouveauSongho = [...songho];
    nouveauSongho[caseJouer] = 0;
    const main = nouveauSongho[caseJouer];

    const prev = (i) => (i - 1 + 14) % 14;
    if(isGrenier){
        for(let step = 0; step <13 && reste >0; step++){
            caseActuel = prev(caseActuel)
            if (caseActuel === caseJouer) continue;
            nouveauSongho[caseActuel]++;
            reste--;
            DerniereJouer = caseActuel;
        }
       
        while (reste > 0) { // Si des graines restent après un tour on continue
            caseActuel = prev(caseActuel);
            if (caseActuel === caseJouer) continue;
            nouveauSongho[caseActuel]++;
            reste--;
            DerniereJouer = caseActuel;
        }

    }
    else{
        while(reste > 0){
            caseActuel = prev(caseActuel);
            nouveauSongho[caseActuel]++;
            reste--;
            DerniereJouer = caseActuel
        }
    }
    return {nouveauSongho ,DerniereJouer,isGrenier}
}

function Nourir(player){
    const adv = advert(player);
    const max_graine = Math.max(...gameState.board[player])
    if(totalAdv(adv) > 0) return;
    for(let i = 0;i < NB_CASES;i++){
        if(gameState.board[player][i] === 0) continue;
        if(gameState.board[player][i] === max_graine){
            const lin = buildsongho(player);
            const possibleCoup = semer(lin,i);
            return possibleCoup;
        }
    }
    return false;
}

function GameWin(player) {
  const adv = opponent(player);
  const songho = buildsongho(player);
  let gain = 0;
  let reste = 0;

    if(totalAdv(adv) >= SEUIL_FIN || totalAdv(player)){
        gameState.over = true;
        gameStates.winner = player
        return player
    }
    else if(gameState.scores[player] >= SEUIL_WIN || gameState.scores[adv] >= SEUIL_WIN){
        gameState.over = true;
        gameState.winner = gameState.scores[player] > gameState.scores[adv] ? player : adv;
        return player
    }
    else{
        
    }

function getState()   { return gameState; }
function getHistory() { return history;   }

}
