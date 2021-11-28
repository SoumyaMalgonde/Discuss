require("dotenv").config();
const express = require('express');
const router = express.Router();
const db = require("../config/db");
const mysql = require('mysql2');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// jwt authentication; function to verify jwt token and get user details
async function getUserFromToken(token) {
    return new Promise((resolve, err) => {
        const userInfo = jwt.verify(token, process.env.SECRET);
        const id = userInfo.id;
        let user;
        db.getConnection((err1, connection) => {
            if (err1) throw (err1);
            const sqlSearch = `SELECT username FROM user 
                            WHERE id = ?;`;
            const search_query = mysql.format(sqlSearch, [id]);
            connection.query(search_query, (err, result) => {
                const user = result[0];
                resolve(user);
            })
        })
    })
}

module.exports = getUserFromToken;