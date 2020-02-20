const p1Frame = document.querySelector('#p1Frame');
const p2Frame = document.querySelector('#p2Frame');
const p1FramePoints = document.querySelector('#p1FramePoints');
const p2FramePoints = document.querySelector('#p2FramePoints');
const navMiddle = document.querySelector('#navMiddle');
const btnReady = document.querySelector('#btnReady');

btnReady.addEventListener('click', () => ready(game.turn));

function setInitialRound() {
    $('#p1FrameUsername').text(game.playerList[0].username);
    $('#p2FrameUsername').text(game.playerList[1].username);
}

function updateNextRound(player) {
    let n = (game.turn.username != game.playerList[0].username) ? 1 : 2;
    game.getPoints(n).done(res => {
        let points = res.res[0];
        if (game.playerList[0].username != player.username) { // Next: P2
            document.querySelector('#p1FrameCircle').classList.remove('frameCircleTurn');
            document.querySelector('#p1FrameCircle').classList.add('frameCircleNoTurn');

            document.querySelector('#p2FrameCircle').classList.remove('frameCircleNoTurn');
            document.querySelector('#p2FrameCircle').classList.add('frameCircleTurn');

            document.querySelector('#p1FrameUsername').classList.remove('frameTextTurn');
            document.querySelector('#p1FrameUsername').classList.add('frameTextNoTurn');

            document.querySelector('#p2FrameUsername').classList.remove('frameTextNoTurn');
            document.querySelector('#p2FrameUsername').classList.add('frameTextTurn');

            p1FramePoints.innerText = points;
        } else if (game.playerList[1].username != player.username) { // Next: P1
            document.querySelector('#p2FrameCircle').classList.remove('frameCircleTurn');
            document.querySelector('#p2FrameCircle').classList.add('frameCircleNoTurn');

            document.querySelector('#p1FrameCircle').classList.remove('frameCircleNoTurn');
            document.querySelector('#p1FrameCircle').classList.add('frameCircleTurn');

            document.querySelector('#p2FrameUsername').classList.remove('frameTextTurn');
            document.querySelector('#p2FrameUsername').classList.add('frameTextNoTurn');

            document.querySelector('#p1FrameUsername').classList.remove('frameTextNoTurn');
            document.querySelector('#p1FrameUsername').classList.add('frameTextTurn');

            p2FramePoints.innerText = points;
        }
    });
}

// DB Game Implementation
function ready() {
    let data = updateEnvironment(false);
    let letters = '';
    for (let i = 0; i < data.length; i++) {
        let s = `${data[i].x},${data[i].y},${data[i].letter}-`;
        letters += s;
    }
    letters = letters.substr(0, letters.length - 1);
    let points = 0;

    if (data.length != 0) {
        game.validateWord(game.turn.username, letters).done(res => {
            points = res.body.points;
    
            if (points > 0) {
                game.givePoints(points).done(() => {
                    updateEnvironment(true);
                    game.nextTurn();
                });
            }
        });
    } else {
        let playerIndex = (game.turn.username == game.playerList[0].username) ? 0 : 1;
        game.skips[playerIndex]++;

        if ((game.skips[0] + game.skips[1]) == 6) {
            game.end();
        } else {
            game.nextTurn();
        }

        
    }

    
}

// Update environment
function updateEnvironment(update) {
    let data = [];
    for (let i = 1; i < svg.childNodes.length; i += 2) {
        let e = svg.childNodes[i].childNodes[3];
        if (e != undefined) {
            if (e.getAttribute('data-oldmove') == 'false') {
                let dataLetter = {};

                dataLetter.x = svg.childNodes[i].getAttribute('x');
                dataLetter.y = svg.childNodes[i].getAttribute('y');
                dataLetter.letter = e.getAttribute('data-letter');

                if (update) {
                    e.setAttribute('data-oldmove', 'true');
                }

                data.push(dataLetter);
            }
        }

    }
    return data;
}