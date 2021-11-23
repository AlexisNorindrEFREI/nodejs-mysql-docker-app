'use strict';

const express = require('express');
const mysql = require('mysql2');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST_IP,
    user: "root",
    database: "test_db",
    password: "root"
});

// App
const app = express();
app.get('/', (req, res) => {

    db.connect(function (err) {
        if (err) throw err;
        console.log("Connecté à la base de données MySQL!");

        var create_table = "CREATE TABLE IF NOT EXISTS numbers (number INTEGER)";
        db.query(create_table, function (err) {
            if (err) throw err;
            console.log("Table created");

            var insert_new_number = "INSERT INTO numbers (number) VALUES (1)";
            db.query(insert_new_number, function (err) {
                if (err) throw err;
                console.log("1 record inserted");
            });

            var get_numbers_count = "SELECT COUNT(*) as numberOfNumbers FROM numbers";
            db.query(get_numbers_count, function (err, result,) {
                if (err) throw err;
                console.log(result);
                res.send("number of numbers in mysql db : " + result[0].numberOfNumbers)
            });
        });
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);