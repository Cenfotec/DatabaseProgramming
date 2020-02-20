const express = require('express');
const router = express.Router();

const oracledb = require('oracledb');
const dbConfig = require('./db-oracle');

router.get('/', (req, res, next) => {
    const query = 'SELECT * FROM TABLERO';

    oracledb.getConnection(
        dbConfig,
        (err, connection) => {
            if (err) { console.error(err); return; }
            connection.execute(
                query,
                function (err, result) {
                    if (err) { console.error(err); return; }
                    {
                        res.status(200).json({
                            message: 'Handling GET requests to /games',
                            res: result.rows
                        });
                    };
                });
        });
});

// Get letters of player of a specific game
router.get('/get_letters/:id&:username', (req, res, next) => {
    const query = `SELECT ID_USUARIO, ID_LETRA FROM LETRAS_USUARIO_TABLERO WHERE
                   ID_USUARIO = '${req.params.username}' AND
                   ID_TABLERO = ${req.params.id}`;

    oracledb.getConnection(
        dbConfig,
        (err, connection) => {
            if (err) { console.error(err); return; }
            connection.execute(
                query,
                function (err, result) {
                    if (err) { console.error(err); return; }
                    {
                        res.status(200).json({
                            message: 'Handling GET requests to /games',
                            res: result.rows
                        });
                    };
                });
        });
});



// Get points of player of a specific game
router.get('/get_points/:id&:player', (req, res, next) => {
    let query = ``;

    if (req.params.player == 1) {
        query = `SELECT PUNTAJE_JG_1 FROM TABLERO WHERE ID = ${req.params.id}`;
    } else if (req.params.player == 2) {
        query = `SELECT PUNTAJE_JG_2 FROM TABLERO WHERE ID = ${req.params.id}`;
    }

    oracledb.getConnection(
        dbConfig,
        (err, connection) => {
            if (err) { console.error(err); return; }
            connection.execute(
                query,
                function (err, result) {
                    if (err) { console.error(err); return; }
                    {
                        res.status(200).json({
                            message: 'Handling GET requests to /games',
                            res: result.rows
                        });
                    };
                });
        });
});

// Validate the winner
router.post('/validate_winner', (req, res, next) => {
    validar_ganador_pr(req, res);
});

// Increment the stats
router.post('/increment_stats', (req, res, next) => {
    incrementar_estadisticas_pr(req, res);
});

// Give points
router.post('/give_points', (req, res, next) => {
    otorgar_puntos_pr(req, res);
});

// Validate word
router.post('/validate_word', (req, res, next) => {
    validar_palabra_pr(req, res);
});

// Exchange letters
router.post('/exchange_letters', (req, res, next) => {
    exchange_pr(req, res);
});

router.post('/create', (req, res, next) => {
    crear_tablero_sp(req, res);
});

async function crear_tablero_sp(req, res) {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        await connection.execute(
            `BEGIN
            TABLEROS_PKG.CREAR_TABLERO_PR(:id, :pone, :ptwo);
         END;`,
            {
                id: req.body.id,
                pone: req.body.player_one,
                ptwo: req.body.player_two

            },
            { autoCommit: true }
        );

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
                res.status(200).json({
                    message: 'Handling GET requests to /games',
                    body: req.body
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
}


async function exchange_pr(req, res) {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        await connection.execute(
            `BEGIN
            TABLEROS_PKG.EXCHANGE_PR(:id, :username, :letter);
         END;`,
            {
                id: req.body.id,
                username: req.body.username,
                letter: req.body.letter

            },
            { autoCommit: true }
        );

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
                res.status(200).json({
                    message: 'Handling GET requests to /games',
                    body: req.body
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
}




async function validar_palabra_pr(req, res) {
    let connection;
    let points = 0;

    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `BEGIN
            TABLEROS_PKG.VALIDAR_PALABRA_PR(:id, :username, :letters, :points);
         END;`,
            {
                id: req.body.id,
                username: req.body.username,
                letters: req.body.letters,
                points: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }

            },
            { autoCommit: true }
        );

        points = result.outBinds;

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
                res.status(200).json({
                    message: 'Handling GET requests to /games',
                    body: points
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
}









async function otorgar_puntos_pr(req, res) {
    let connection;
    let points = 0;

    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `BEGIN
            TABLEROS_PKG.OTORGAR_PUNTOS_PR(:id, :username, :points);
         END;`,
            {
                id: req.body.id,
                username: req.body.username,
                points: req.body.points

            },
            { autoCommit: true }
        );

        points = result.outBinds;

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
                res.status(200).json({
                    message: 'Handling GET requests to /games',
                    body: points
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
}



async function incrementar_estadisticas_pr(req, res) {
    let connection;
    let points = 0;

    try {
        connection = await oracledb.getConnection(dbConfig);

        await connection.execute(
            `BEGIN
            TABLEROS_PKG.INCREMENTAR_ESTADISTICA_PR(:username, :games_played, :games_won, :games_lost);
         END;`,
            {
                username: req.body.username,
                games_played: req.body.games_played,
                games_won: req.body.games_won,
                games_lost: req.body.games_lost
            },
            { autoCommit: true }
        );

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
                res.status(200).json({
                    message: 'Handling GET requests to /games',
                    body: points
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
}




async function validar_ganador_pr(req, res) {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        await connection.execute(
            `BEGIN
            TABLEROS_PKG.VALIDAR_GANADOR_PR(:id);
         END;`,
            {
                id: req.body.id
            },
            { autoCommit: true }
        );

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
                res.status(200).json({
                    message: 'Handling GET requests to /games',
                    body: res.body
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
}




module.exports = router;