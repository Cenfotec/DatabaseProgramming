class Player {
    constructor(username) {
        this.username = username;
        this.points = 0;
        this.letters = [];
    }

    shuffle() {
        for (var i = this.letters.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.letters[i];
            this.letters[i] = this.letters[j];
            this.letters[j] = temp;
        }
    }

    removeLetter(letter) {
        let i = this.letters.indexOf(letter);
        this.letters.splice(i, 1);
    }

    addLetter(letter) {
        this.letters.push(letter);
    }
}