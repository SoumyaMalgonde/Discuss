require("dotenv").config();
const express = require('express');
const router = express.Router();
const db = require("../config/db");
const mysql = require('mysql2');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUserFromToken = require("./Utils");

// API to get all posts
router.get("/", async (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            res.statusCode(500);
        } else {
            // get all posts from db
            const sql_search_query = `SELECT comment_id, username, title, body, posted_at FROM comment
                                    WHERE is_discussion_comment = true AND root_id is NULL 
                                    ORDER BY posted_at DESC; `;
            connection.query(sql_search_query, (err, result) => {
                connection.release();
                if (err) {
                    res.statusCode(500);
                } else {
                    res.json(result);
                }
            })
        }
    })
})

// API to get post with comment_id = id from params
router.get("/:id", async (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            res.statusCode(500);
        } else {
            // get post with required id from db
            const id = req.params.id;
            const sqlSearch = `SELECT comment_id, username, title, body, posted_at, parent_id FROM comment 
                            where is_discussion_comment = true AND comment_id=? 
                            ORDER BY posted_at DESC; `;
            const sql_search_query = mysql.format(sqlSearch, [id]);
            connection.query(sql_search_query, (err, result) => {
                connection.release();
                if (err) {
                    res.statusCode(500);
                } else {
                    res.json(result);
                }
            })
        }
    })
})

// API to get all comments having root_id = id from params
router.get("/root/:id", async (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            res.statusCode(500);
        } else {
            // get all comments having same root (with required id) from db 
            const root_id = req.params.id;
            const sqlSearch = `SELECT comment_id, username, title, body, posted_at, parent_id, root_id FROM comment 
                            WHERE is_discussion_comment = true AND root_id = ? 
                            ORDER BY posted_at DESC; `;
            const sql_search_query = mysql.format(sqlSearch, [root_id]);
            connection.query(sql_search_query, (err, result) => {
                connection.release();
                if (err) {
                    res.statusCode(500);
                } else {
                    res.json(result);
                }
            })
        }
    })
})

// create a post
router.post("/", async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.sendStatus(401);
    } else {
        getUserFromToken(token)
            .then((userInfo) => {
                db.getConnection((err, connection) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        // insert post in db
                        const { title, body, parent_id, root_id } = req.body;
                        const date = new Date();
                        const username = userInfo.username;
                        const sqlInsert = `INSERT INTO comment (username, title, body, parent_id, root_id, is_discussion_comment)  
                                        VALUES(?, ?, ?, ?, ?, true);`;
                        const insert_query = mysql.format(sqlInsert, [username, title, body, parent_id, root_id]);
                        connection.query(insert_query, (err, result) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(409);
                            } else {
                                // get the id of newly created post from db
                                const sqlSearch = `SELECT comment_id FROM comment 
                                                WHERE username = ? AND title = ?;`;
                                const search_query = mysql.format(sqlSearch, [username, title]);
                                connection.query(search_query, (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        res.sendStatus(409);
                                    } else {
                                        res.json(result[0]);
                                    }
                                })
                            }
                        })
                    }
                })
            }).catch((err) => {
                console.log(err);
                res.sendStatus(401);
            });
    }
})

module.exports = router;