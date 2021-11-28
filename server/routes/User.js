require("dotenv").config();
const express = require('express');
const router = express.Router();
const db = require("../config/db");
const mysql = require('mysql2');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUserFromToken = require("./Utils");

// API to register user  
router.post("/register", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    // hash password to store hashed passwords in db
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    db.getConnection((err, connection) => {
        if (err) {
            res.sendStatus(500);
        } else {
            const sqlSearchByEmail = `SELECT username FROM user 
                                    WHERE email = ?;`;
            const search_query_by_email = mysql.format(sqlSearchByEmail, [email]);
            const sqlSearchByUsername = `SELECT username FROM user 
                                        WHERE username = ?;`;
            const search_query_by_username = mysql.format(sqlSearchByUsername, [username]);
            const sqlInsert = `INSERT INTO user 
                            VALUES (0, ?, ?, ?);`
            const insert_query = mysql.format(sqlInsert, [email, username, hashedPassword])
            // check if email is already registered
            connection.query(search_query_by_email, (err, result) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    if (result.length != 0) {
                        connection.release();
                        console.log("------> Email already registered");
                        res.sendStatus(409);
                    }
                    else {
                        // check if username is taken
                        connection.query(search_query_by_username, (err, result) => {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                if (result.length != 0) {
                                    connection.release();
                                    console.log("------> USername is taken");
                                    res.sendStatus(409);
                                }
                                else {
                                    // insert new user in db
                                    connection.query(insert_query, (err, result) => {
                                        connection.release()
                                        if (err) {
                                            res.sendStatus(500);
                                        } else {
                                            if (err) {
                                                res.sendStatus(500);
                                            } else {
                                                console.log("--------> Created new User")
                                                console.log(result.insertId)
                                                // jwt athentcation, creating and sending a token
                                                jwt.sign({ id: result.insertId }, process.env.SECRET, (err, token) => {
                                                    if (err) {
                                                        res.sendStatus(500);
                                                    } else {
                                                        res.status(201).cookie('token', token).send();
                                                    }
                                                });
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }

    })
})

// API to login user (authenticate user)
router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.getConnection((err, connection) => {
        if (err) {
            res.sendStatus(500);
        } else {
            // get hashedpassword stored in db
            const sqlSearch = `SELECT id, password FROM user 
                            WHERE username = ?;`;
            const search_query = mysql.format(sqlSearch, [username]);
            connection.query(search_query, (err, result) => {
                connection.release();
                if (err) {
                    res.sendStatus(500);
                } else {
                    if (result.length == 0) {
                        console.log("--------> User does not exist");
                        res.sendStatus(404);
                    }
                    else {
                        // jwt authentication, creating and sending a token
                        const id = result[0].id;
                        const hashedPassword = result[0].password //get the hashedPassword from result
                        if (bcrypt.compareSync(password, hashedPassword)) {
                            console.log("---------> Login Successful");
                            jwt.sign({ id: id }, process.env.SECRET, (err, token) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                } else {
                                    res.status(200).cookie('token', token).send();
                                }
                            });
                        }
                        else {
                            console.log("---------> Password Incorrect");
                            res.sendStatus(422);
                        }
                    }
                }
            })
        }
    })
})

// API to logout
router.post('/logout', (req, res) => {
    res.cookie('token', '').send();
});

// API to get username of currently logged in user 
router.get('/', (req, res) => {
    const token = req.cookies.token;
    getUserFromToken(token)
        .then(user => {
            res.json({ username: user.username });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(401);
        });
})

module.exports = router;