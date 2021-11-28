require("dotenv").config();
const express = require('express');
const router = express.Router();
const db = require("../config/db");
const mysql = require('mysql2');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUserFromToken = require("./Utils");

// API to upvote / downvote / unvote
router.get("/:comment_id/:direction", async (req, res) => {
    getUserFromToken(req.cookies.token)
        .then(user => {
            db.getConnection((err, connection) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    // removing existing votes
                    const voter = user.username;
                    const comment_id = req.params.comment_id;
                    const sqlDelete = `DELETE FROM vote 
                                    WHERE voter = ? AND comment_id = ?;`;
                    const delete_query = mysql.format(sqlDelete, [voter, comment_id]);
                    connection.query(delete_query, (err, result) => {
                        if (err) {
                            connection.release();
                            res.sendStatus(500);
                        } else {
                            // returning after deletion if user wants to unvote
                            if (['up', 'down'].indexOf(req.params.direction) === -1) {
                                res.json("unvoted ok");
                                return;
                            }
                            // creating vote if user wants to upvote/downvote
                            let is_upvote = req.params.direction === 'up' ? 1 : 0;
                            const sqlInsert = `INSERT INTO VOTE (
                                voter,
                                comment_id,
                                is_upvote
                            ) VALUES(?, ?, ?);`;
                            const insert_query = mysql.format(sqlInsert, [voter, comment_id, is_upvote]);
                            connection.query(insert_query, (err, result) => {
                                connection.release();
                                if (err) {
                                    res.sendStatus(500);
                                } else {
                                    res.json("voted ok");
                                }
                            })
                        }
                    })
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(401);
        })
})

// API to get total net votes for all passed comment_ids and uservotes for all passed comment_ids
router.post('/', (req, res) => {
    const { comment_ids } = req.body;
    getUserFromToken(req.cookies.token)
        .then(user => {
            // get total votes and user votes
            db.getConnection((err, connection) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    const sqlSearch = `SELECT * FROM vote 
                                    WHERE comment_id IN (?);`;
                    const search_query = mysql.format(sqlSearch, [comment_ids]);
                    connection.query(search_query, (err, result) => {
                        connection.release();
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            let commentsTotals = {};
                            let userVotes = {};
                            // calculating net totals for each comment_id
                            result.forEach(vote => {
                                if (typeof commentsTotals[vote.comment_id] === 'undefined') {
                                    commentsTotals[vote.comment_id] = 0;
                                }
                                if (vote.is_upvote) {
                                    commentsTotals[vote.comment_id] += 1;
                                } else {
                                    commentsTotals[vote.comment_id] -= 1;
                                }
                            });
                            // calculating user votes
                            result.forEach(vote => {
                                if (vote.voter === user.username) {
                                    userVotes[vote.comment_id] = vote.is_upvote ? 1 : -1;
                                }
                            })
                            res.json({ commentsTotals, userVotes });
                        }
                    })
                }
            });

        })
        .catch(err => {
            console.log(err);
            res.sendStatus(401);
        })
})

module.exports = router;