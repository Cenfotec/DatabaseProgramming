class Game {
    constructor(id, playerList) {
        this.id = id;
        this.playerList = playerList; // Array
        this.turn = playerList[0]; // Default: First Player
        this.skips = [0, 0];

        this.update();
    }

    update() {
        let letters = [];

        scrabbleDB.getPlayerLetters({ id: this.id, username: this.playerList[0].username }).done(res => {
            res.res.forEach(e => letters.push(e[1]));
            this.playerList[0].letters = letters;

            scrabbleDB.getPlayerLetters({ id: this.id, username: this.playerList[1].username }).done(res => {
                letters = [];
                res.res.forEach(e => letters.push(e[1]));
                this.playerList[1].letters = letters;
            });
        });
    }

    nextTurn() {
        let letters = [];

        scrabbleDB.getPlayerLetters({ id: this.id, username: this.playerList[0].username }).done(res => {
            res.res.forEach(e => letters.push(e[1]));
            this.playerList[0].letters = letters;

            scrabbleDB.getPlayerLetters({ id: this.id, username: this.playerList[1].username }).done(res => {
                letters = [];
                res.res.forEach(e => letters.push(e[1]));
                this.playerList[1].letters = letters;

                // Main
                this.turn = (this.turn.username == this.playerList[0].username) ? this.playerList[1] : this.playerList[0];

                generatePlayerDisplay(this.id, this.turn.username);
                updateNextRound(this.turn);
            });
        });
    }

    validateUserMove(username) {
        return (this.turn.username == username);
    }

    exchange() {
        this.nextTurn();
    }

    validateWord(username, letters) {
        let data = 
        {
            id: this.id,
            username: username,
            letters: letters
        };
        return scrabbleDB.validateWord(data);
    }

    givePoints(points) {
        let data = 
        {
            id: this.id,
            username: this.turn.username,
            points: points
        }
        return scrabbleDB.givePoints(data);
    }

    getPoints(player) {
        let data =
        {
            id: this.id,
            player: player
        }
        return scrabbleDB.getPoints(data);
    }

    incrementStats(username, games_played, games_won, games_lost) {
        let data =
        {
            username: username,
            games_played: games_played,
            games_won: games_won,
            games_lost: games_lost
        }
        return scrabbleDB.incrementStats(data);
    }

    validateWinner() {
        let data =
        {
            id: this.id
        }
        return scrabbleDB.validateWinner(data);
    }

    end() {
        this.nextTurn();
        document.querySelector('#gameScreen').style.display = 'none';
        document.querySelector('#playerScreen').style.display = 'flex';

        this.validateWinner();
    }
}