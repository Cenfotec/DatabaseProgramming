const express = require('express');
const router = express.Router();

const oracledb = require('oracledb');
const dbConfig = require('./db-oracle');

router.get('/', (req, res, next) => {
    const query = 'SELECT * FROM LETRA';

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
                            message: 'Handling GET requests to /letters',
                            res: result.rows
                        });
                    };
                });
        });
});

module.exports = router;