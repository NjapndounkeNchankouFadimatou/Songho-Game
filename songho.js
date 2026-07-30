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

function advert(player){
    return player === NORTH? SOUTH :NORTH;
}

function totalAdv(player){
    return gameState.board[player].reduce((acc,val) =>acc +val,0);
}
function totalGraines(){
    return totalAdv(NORTH) = totalAdv(SOUTH);
}

function tableSongho(player){
    const adv = advert(player);
    return [...gameState.board[player],...gameState.board[adv]];//concatenation simple des deux secction pour en faire  un plateau
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

function prises(songho, lastCase, player, isGrenier){
    let captured = 0;
    if (lastCase < 7) return { songho, captured };

    //vider la case concerner
    if(isGrenier && lastCase === 7){
        const tableauTest = [...songho];
        tableauTest[7] = 0;
         const restAdv = tableauTest.slice(7).reduce((s, v) => s + v, 0);
        if (restAdv > 0) { //regle de non famine
            captured += songho[7]; 
            songho[7] = 0; 
            return { songho, captured };
        } 
    } 

    const prendreGraines = (caseActuel) => [2, 3, 4].includes(songho[current]);
    const firstAdv = 7;
    if(!prendreGraines(lastCase)) return {songho ,captured};
    if(lastCase === firstAdv) return {songho ,captured};

    //simulation d'une prise pour eviter les erreurs
    const simul = [...songho];
    simul[lastCase] = 0;
    let enChaine = lastCase + 1;
    while(enChaine >= firstAdv && prendreGraines(simul[enChaine])){
        simul[enChaine] = 0;
        enChaine--;
    }
    const restantAdv = simul.slice(7).reduce((acc, value) => acc + value, 0);
    if (restantAdv === 0) return { songho, captured };

    captured += songho[lastCase];
    songho[lastCase] = 0;
    let chaineSuiv = lastCase - 1;

    while(chaineSuiv >= firstAdv){
        if(!prendreGraines(songho[chaineSuiv])) break;
        captured += songho[chaineSuiv];
        songho[chaineSuiv] = 0;
        chaineSuiv--;
    }
    return {songho,captured};

}

function coupsLegaux(player) {
  const adv    = advert(player);
  const adVide = totalAdv(ad) === 0;
  const coups   = [];
  for (let i = 0; i < NB_CASES; i++) {
    if (gameState.board[player][i] === 0) continue;
    if (adVide) {
      const lin = tableSongho(player);
      const { songho: linAfter } = semer([...lin], i);
      if (linAfter.slice(7).reduce((s, v) => s + v, 0) > 0) coups.push(i);
    } else {
      coups.push(i);
    }
  }
  return coups;
}

function Nourir(player){
    const adv = advert(player);
    const max_graine = Math.max(...gameState.board[player])
    if(totalAdv(adv) > 0) return;

    for(let i = 0;i < NB_CASES;i++){
        if(gameState.board[player][i] === 0) continue;
        if(gameState.board[player][i] === max_graine){
            const lin = tableSongho(player);
            const possibleCoup = semer(lin,i);
            return possibleCoup;
        }
    }
    return false;
}

function checkEndGame() {
  if (gameState.scores[NORD] >= SEUIL_WIN) { endGame('score', NORD); return true; }
  if (gameState.scores[SUD]  >= SEUIL_WIN) { endGame('score', SUD);  return true; }
  if (totalmain() < SEUIL_FIN)             { endGame('peu_main');     return true; }
  return false;
}


function GameWin(raison, player = null) {
    const adv = advert(player);
    //variable d'utilisation
    const Tadv = totalAdv(adv);
    const Tply = totalAdv(player);
    const pScore = gameState.scores[player];
    const pAdv = gameState.scores[adv];
    let winner = gameState.winner;
    

    if(Tadv <= SEUIL_FIN || Tply <= SEUIL_FIN){
        gameState.scores[adv] += Tadv;
        gameState.scores[player]  += Tply;

        gameState.board[NORTH].fill(0);
        gameState.board[SOUTH].fill(0);

        gameState.over = true;

        if (gameState.scores[player] === gameState.scores[adv]) {
            gameState.winner = 'draw';
            gameState.message = `Fin de partie (${raison}). Égalité parfaite : ${gameState.scores[player]} - ${gameState.scores[adv]}`;
        }
        else{
            winner = gameState.scores[player] > gameState.scores[adv] ? player : adv;
            gameState.message = `${winner} gagne avec ${gameState.scores[winner]} en main ! (${raison})`;
        }
        return winner;
    }
    else if(pScore >= SEUIL_WIN || pAdv >= SEUIL_WIN){
        gameState.board[NORTH].fill(0);
        gameState.board[SUD].fill(0);

        gameState.over = true;

        winner = pScore > pAdv ? player : adv;
        `Fin de partie (${raison}). Nord: ${gameState.scores[NORTH]} | Sud: ${gameState.scores[SOUTH]}. ` +
        `Résultat : winner + ' gagne'}.`;
        return winner;
    }
    else{
      gameState.over = false;  
      return null;
    }
}
function playMove(caseActuel){
    if (gameState.over) {
        gameState.message = 'La partie est déjà terminée.';
        return gameState;
    }

    const player = gameState.current;
    const adv = advert(player);


    const legaux = coupsLegaux(player);
    if (!legaux.includes(caseActuel)) {
        gameState.message = `Coup illégal (case ${casecurrent + 1}).`;
        return gameState;
    }
    let songho = tableSongho(player);
    const { songho: afterTable, lastCase, isGrenier } = semer([...songho], caseActuel);
    const { songho: finalTableau, captured } = prises(afterTable, lastCase, player, isGrenier);

    const newBoards = BackBoard(linFinal, player);
    gameState.board[player] = newBoards[player];
    gameState.board[ad]    = newBoards[ad];

    gameState.scores[player]      += captured;
    gameState.tourCaptures[player] = captured;
    gameState.tourCaptures[ad]    = 0;

    gameState.message = `${player} joue case ${caseActuel + 1}. Capture : ${captured} graine(s).`;
    history.push({
    tour:    gameState.tour,
    player,
    case:    caseActuel + 1,
    captured,
  });

    // Vérification fin de partie originale (inchangée)
    if (checkEndGame()) return gameState;

    gameState.current = adv;
    gameState.tour++;

    if (totalAdv(ad) === 0 && !Nourir(gameState.current)) {
        endGame('nourrir');
        return gameState;
    }

    if (coupsLegaux(gameState.current).length === 0) {
        endGame('aucun_coup');
        return gameState;
    }
    return;
}


//utils for the interactions in game_page.html
function getState()   { return gameState; }
function getHistory() { return history;   }

initGame();