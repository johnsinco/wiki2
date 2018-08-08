const level = require('level');
const db = level('./kvstore-db', { valueEncoding: 'json' });

module.exports = db
