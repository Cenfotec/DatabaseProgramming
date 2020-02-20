const express = require('express');
const router = express.Router();

const oracledb = require('oracledb');
const dbConfig = require('./db-oracle');

router.get('/', (req, res, next) => {
    const query = 'SELECT NOMBRE FROM USUARIO';

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
                            message: 'Handling GET requests to /users',
                            res: result.rows
                        });
                    };
                });
        });
});

router.post('/register', (req, res, next) => {
    sp_register(req, res);
});

router.get('/leaderboard', (req, res, next) => {
    const query = 'SELECT * FROM USUARIO ORDER BY PARTIDAS_GANADAS DESC';

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
                            message: 'Handling GET requests to /users',
                            res: result.rows
                        });
                    };
                });
        });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const query = `SELECT * FROM USUARIO WHERE NOMBRE = '${id}'`;

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
                            message: 'Handling GET requests to /users',
                            res: result.rows
                        });
                    };
                });
        });

});

async function sp_register(req, res) {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        await connection.execute(
            `BEGIN
            USUARIOS_PKG.CREAR_USUARIO_PR(:i);
         END;`,
            {
                i: req.body.username
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
                    message: 'Handling GET requests to /users',
                    body: req.body
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
}







module.exports = router;