class ScrabbleDB {
    constructor() {
        this.API_URL = 'http://localhost:3000/api/';
    }

    // Register user
    register(data) {
        return postMethodToAPI(this.API_URL + 'users/register', data);
    }

    // Get users
    getUsers() {
        return getMethodToAPI(this.API_URL + 'users');
    }

    // Get leaderboard
    getLeaderboard() {
        return getMethodToAPI(this.API_URL + 'users/leaderboard');
    }

    // Get boards
    getBoards() {
        return getMethodToAPI(this.API_URL + 'games');
    }

    // Create game
    createGame(data) {
        return postMethodToAPI(this.API_URL + 'games/create', data);
    }

    // Get default letters
    getLetters() {
        return getMethodToAPI(this.API_URL + 'letters');
    }

    // Get default letters
    getPlayerLetters(data) {
        return getMethodToAPI(this.API_URL + `games/get_letters/${data.id}&${data.username}`);
    }

    // Exchange letters
    exchangeLetters(data) {
        return postMethodToAPI(this.API_URL + 'games/exchange_letters', data);
    }

    // Validate letters
    validateWord(data) {
        return postMethodToAPI(this.API_URL + 'games/validate_word', data);
    }

    // Give points
    givePoints(data) {
        return postMethodToAPI(this.API_URL + 'games/give_points', data);
    }

    // Get points
    getPoints(data) {
        return getMethodToAPI(this.API_URL + `games/get_points/${data.id}&${data.player}`);
    }

    // Increment statistics of a player
    incrementStats(data) {
        return postMethodToAPI(this.API_URL + 'games/increment_stats', data);
    }

    // Validate winner
    validateWinner(data) {
        return postMethodToAPI(this.API_URL + 'games/validate_winner', data);
    }
}