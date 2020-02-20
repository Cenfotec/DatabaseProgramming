const playerScreen = document.querySelector('#playerScreen');
const registerScreen = document.querySelector('#registerScreen');
const gameScreen = document.querySelector('#gameScreen');
const leaderboardScreen = document.querySelector('#leaderboardScreen');
const btnPlay = document.querySelector('#btnPlay');
const btnLeaderboard = document.querySelector('#btnLeaderboard');
const closeRegister = document.querySelector('#closeRegisterWrapper');
const closeLeaderboard = document.querySelector('#closeLeaderboardWrapper');
const btnRegisterConfirm = document.querySelector('#btnRegisterConfirm');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const scrabbleDB = new ScrabbleDB();
let game;

// Temp
let usernames = [];
scrabbleDB.getUsers().done(res => {
    res.res.forEach(e => usernames.push(e[0]));
});

// tmpGame();
function tmpGame() {
    playerScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    let p1Username = p1.value.replace(/\s/g, '');
    let p2Username = p2.value.replace(/\s/g, '');

    // DB
    let idBoard;
    scrabbleDB.getBoards().done(res => {
        idBoard = (res.res.length+1)
        scrabbleDB.createGame(
            {
                id: idBoard,
                player_one: p1Username,
                player_two: p2Username
            }
            ).done(() => {
                let players = [];
                let p1Player = new Player(p1.value.replace(/\s/g, ''));
                let p2Player = new Player(p2.value.replace(/\s/g, ''));
                players.push(p1Player, p2Player);
                game = new Game(idBoard, players);
                generateEnvironment();


                sessionStorage.setItem('_game', JSON.stringify(game));
                tmpGame2();
            });
    });

    // let players = [];
    // let p1Player = new Player(p1.value.replace(/\s/g, ''));
    // let p2Player = new Player(p2.value.replace(/\s/g, ''));
    // players.push(p1Player, p2Player);
    // game = new Game(1, players);
    // generateEnvironment();

    // tmpGame2();
}

function tmpGame2() {
    generatePlayerDisplay(game.id, game.turn.username);

    playerScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    setInitialRound();

    game.incrementStats(game.playerList[0].username, 1, 0 ,0);
    game.incrementStats(game.playerList[1].username, 1, 0 ,0);
}

// --------------------

p1.addEventListener('keyup', validate);
p2.addEventListener('keyup', validate);

// gameScreen.style.display = 'none';
btnPlay.addEventListener('click', playGame);

btnLeaderboard.addEventListener('click', openLeaderboard);

function playGame() {
    let p1Res = validate(p1);
    let p2Res = validate(p2);
    // tmpGame();
    if (p1Res && p2Res) {
        tmpGame();
    }



}

function validate(e) {
    let val;
    let ele;
    if (this.nodeName != 'INPUT') {
        ele = e;
    } else {
        ele = this;
    }

    val = ele.value.replace(/\s/g, '');
    if (usernames.includes(val)) {
        // Username found
        ele.style.borderRight = '5px solid #32DB6E';
        if (ele.parentNode.childNodes.length > 3) {
            ele.parentNode.removeChild(ele.parentNode.childNodes[3]);
        }

        return true;

    } else if (val != '') {
        // Username error

        ele.style.borderRight = '5px solid #EB3A34';
        if (ele.parentNode.childNodes.length > 3) {
            ele.parentNode.removeChild(ele.parentNode.childNodes[3]);
        }


        // Create register username elements
        let chk = document.createElement('i');
        chk.id = 'loginCheck';
        chk.classList.add('fas', 'fa-check');

        let reg = document.createElement('button');
        reg.type = 'button';
        reg.classList.add('btnRegister');
        reg.appendChild(chk);
        reg.addEventListener('click', () => openRegister(val));

        ele.parentNode.appendChild(reg);

        return false;
    } else if (val == '') {
        ele.style.borderRight = '5px solid #F2F2F2';
        if (ele.parentNode.childNodes.length > 3) {
            ele.parentNode.removeChild(ele.parentNode.childNodes[3]);
        }
    }
}



// Register
closeRegister.addEventListener('click', closeRegisterWrapper);

function closeRegisterWrapper() {
    registerScreen.style.display = 'none';
}


function openRegister(username) {
    registerScreen.style.display = 'flex';
    $('#usernameSubtitle').text(username);
    btnRegisterConfirm.addEventListener('click', () => register(username));
}

function register(username) {
    closeRegisterWrapper();

    // Call DB
    scrabbleDB.register({ username: username }).done(() => {
        scrabbleDB.getUsers().done(res => {
            usernames = [];
            res.res.forEach(e => usernames.push(e[0]));
            validate(p1);
            validate(p2);
        });

    });
}




// Leaderboard
closeLeaderboard.addEventListener('click', closeLeaderboardWrapper);

function openLeaderboard() {
    leaderboardScreen.style.display = 'flex';
    scrabbleDB.getLeaderboard().done(res => {
        fillLeaderboard(res.res);
    });
}

function closeLeaderboardWrapper() {
    leaderboardScreen.style.display = 'none';
}

function fillLeaderboard(data) {
    let leaderboardBody = document.querySelector('#leaderboardBody');

    leaderboardBody.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');

        let rank = document.createElement('td');
        rank.innerText = '#' + (i + 1);

        let username = document.createElement('td');
        username.innerText = data[i][0];

        let games_played = document.createElement('td');
        games_played.innerText = data[i][1];

        let games_won = document.createElement('td');
        games_won.innerText = data[i][2];

        let games_lost = document.createElement('td');
        games_lost.innerText = data[i][3];

        tr.appendChild(rank);
        tr.appendChild(username);
        tr.appendChild(games_played);
        tr.appendChild(games_won);
        tr.appendChild(games_lost);

        leaderboardBody.appendChild(tr);
    }
}