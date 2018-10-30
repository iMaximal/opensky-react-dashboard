const SHA512 = require('crypto-js/sha512');
const uuid = require('uuid/v4');

const { APP_SECRET } = require('./secrets');

const hash = str => {
    console.log(SHA512(`${APP_SECRET}${str}${APP_SECRET}`).toString().length); // todo
    return SHA512(`${APP_SECRET}${str}${APP_SECRET}`).toString();
};

class Session {
    constructor(username) {
        this.username = username;
        this.id = uuid();
    }

    toString() {
        return Session.dataToString(this.username, this.id);
    }

    static userData(username, id) {
        return `${username}|${id}`;
    }

    static dataToString(username, id) {
        const user_data = Session.userData(username, id);
        return `${user_data}|${hash(user_data)}`;
    }

    static parse(session_str) {
        const session_data = session_str.split('|');
        return {
            username: session_data[0],
            id: session_data[1],
            session_hash: session_data[2],
        }
    }

    static verify(session_str) {
        const { username, id, session_hash } = Session.parse(session_str);
        const user_data = Session.userData(username, id);

        return hash(user_data) === session_hash;
    }
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

module.exports = { hash, Session, normalizePort };
