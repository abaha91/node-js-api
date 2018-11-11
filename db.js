const MongoClient = require('mongodb').MongoClient;

let state = {
    db: null
};

exports.connect = function (url, useNewUrlParser, done) {

    if (state.db) {
        return done();
    }

    MongoClient.connect(url, useNewUrlParser, (err, db) => {

        if (err) {
            return done(err);
        }

        state.db = db.db('node-js-api-database');
        done();
    })
};

exports.get = function () {
  return state.db;
};