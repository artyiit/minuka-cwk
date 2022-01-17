const helper = require('./helper');

const mysql = require('mysql2/promise');
const config = require('./config');

async function getUsers() {
    const connection = await mysql.createConnection({
        host: config.db.host,
        port: config.db.port,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    });

    const [rows, fields] = await connection.execute(
        `SELECT user.id as id, user.name as name, user.qty as qty, coin.name as coinName
        FROM user as user
        INNER JOIN coin ON user.coinId=coin.id
        ORDER BY id`
    );
    if (rows.length > 0) {
        return rows;
    }
}

async function addUser(user) {
    const connection = await mysql.createConnection({
        host: config.db.host,
        port: config.db.port,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    });
    await connection.execute(
        `INSERT INTO user (name, qty, coinId) VALUES (?,?,?)`,
        [user.name, user.qty, user.coinId]
    );
}

async function patchUser(user) {
    const connection = await mysql.createConnection({
        host: config.db.host,
        port: config.db.port,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    });
    await connection.execute(
        `UPDATE user SET name=?, qty=?, coinId=? where id=?`,
        [user.name, user.qty, user.coinId, user.id]
    );
}

async function removeUser(id) {
    const connection = await mysql.createConnection({
        host: config.db.host,
        port: config.db.port,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    });
    await connection.execute(
        `DELETE FROM user where id=?`,
        [id]
    );
}

module.exports = {
    getUsers,
    addUser,
    removeUser,
    patchUser
}