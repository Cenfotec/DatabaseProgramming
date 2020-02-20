// svg && svgDisplay
const btnShuffle = document.querySelector('#btnShuffle');
const btnExchange = document.querySelector('#btnExchange');
const exchangeScreen = document.querySelector('#exchangeScreen');
const closeExchange = document.querySelector('#closeExchangeWrapper');
const btnExchangeConfirm = document.querySelector('#btnExchangeConfirm');

btnShuffle.addEventListener('click', shuffle);
btnExchange.addEventListener('click', openExchange);
closeExchange.addEventListener('click', closeExchangeWrapper);
btnExchangeConfirm.addEventListener('click', confirmExchange);

let lettersToExchange = [];

let letterMarked = null;
let isFromDisplay = false;

document.oncontextmenu = function (e) {
    let eID = e.srcElement.parentNode.parentNode.parentNode.id;
    if (eID == 'environment' || eID == 'letterDisplay') {
        e.preventDefault();
    }
}

document.addEventListener('click', function (event) {
    if (event.which == 1) {
        draw();
    }
});

function draw() {
    if (!game) return;

    let username = event.target.getAttribute('data-username');
    let isOldMove = event.target.getAttribute('data-oldmove');

    if (event.target.closest('.svgImage')) {
        if (game.validateUserMove(username) && isOldMove == 'false') {
            isFromDisplay = event.target.getAttribute('data-display') == 'true';
            letterMarked = event.target;
            playSound();
        }


    } else if (event.target.closest('.rect') && letterMarked != null) {
        let et = event.target;
        letterMarked.setAttribute('x', et.x.baseVal.value);
        letterMarked.setAttribute('y', et.y.baseVal.value);

        if (et.parentNode.parentNode.id == 'svgDisplay') {
            letterMarked.setAttribute('data-display', 'true');
        } else {
            letterMarked.setAttribute('data-display', 'false');
        }

        let s = new XMLSerializer();
        let lm = s.serializeToString(letterMarked);

        let savedChilds = event.target.parentNode.innerHTML + lm;
        event.target.parentNode.innerHTML = savedChilds;
        letterMarked.parentNode.removeChild(letterMarked);

        let letter = letterMarked.getAttribute('data-letter');

        if (isFromDisplay && et.getAttribute('data-display') == 'false') {
            applyMove(letter, true);
        }
        if (!isFromDisplay && et.getAttribute('data-display') == 'true') {
            applyMove(letter, false);
        }


        letterMarked = null;
        playSound();
    }
}

function playSound() {
    let audio = new Audio('./resources/pop.flac');
    audio.play();
}

function applyMove(letter, remove) {
    if (remove) {
        game.turn.removeLetter(letter);
    } else {
        game.turn.addLetter(letter);
    }

    game.update();
}

function shuffle() {
    game.turn.shuffle();
    game.update();
    generatePlayerDisplay(game.id, game.turn.username);
}

function closeExchangeWrapper() {
    exchangeScreen.style.display = 'none';
}

function openExchange() {
    const exchangeLetters = document.querySelector('#exchangeLetters');
    exchangeLetters.innerHTML = '';
    lettersToExchange = [];
    exchangeScreen.style.display = 'flex'; 
    let letters = [];

    scrabbleDB.getPlayerLetters({ id: game.id, username: game.turn.username }).done(res => {
        res.res.forEach(e => letters.push(e[1]));

        for (let i = 0; i < letters.length; i++) {
            let div = document.createElement('div');
            div.classList.add('exchangeSelectDiv');
    
            let p = document.createElement('p');
            p.innerText = letters[i];
            p.classList.add('exchangeSelectP');
    
            div.setAttribute('data-selected', 'false');
            div.addEventListener('click', e => {
                e = e.target;

                if (e.classList.contains('exchangeSelectP')) {
                    e = e.parentNode;
                }

                if (e.getAttribute('data-selected') == 'false') {
                    lettersToExchange.push(e.childNodes[0].innerText);
                    e.setAttribute('data-selected', 'true');
                    e.classList.add('exchangeSelectDivSelected');
                } else {
                    e.classList.remove('exchangeSelectDivSelected');
                    e.setAttribute('data-selected', 'false');
                    for (let j = 0; j < lettersToExchange.length; j++) {
                        if (lettersToExchange[j] == e.childNodes[0].innerText) {
                            lettersToExchange.splice(j, 1);
                        }
                    }
                }
            });

            div.appendChild(p);
            exchangeLetters.appendChild(div);
        }
    });
}

function confirmExchange() {
    let m = [];
    for (let i = 0; i < lettersToExchange.length; i++) {
        let data = 
        {
            id: game.id,
            username: game.turn.username,
            letter: lettersToExchange[i]
        }
        m.push(scrabbleDB.exchangeLetters(data));
    }

    $.when(m).done(() => {
        game.exchange();
    });
    closeExchangeWrapper();
}