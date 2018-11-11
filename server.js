const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');

let objectId = require('mongodb').ObjectId;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/', (req, res) => {
    res.send('Hello API');
});

app.get('/artists', (req, res) => {
    db.get().collection('artists').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
});

app.get('/artists/:id', (req, res) => {
    db.get().collection('artists').findOne({_id: objectId(req.params.id)}, (err, doc) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        res.send(doc);
    })
});

app.post('/artists', (req, res) => {
    let artist = {
        name: req.body.name,
    };

    db.get().collection('artists').insertOne(artist, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.send(artist);
    });
});

app.put('/artists/:id', (req, res) => {
    db.get().collection('artists').updateOne({_id: objectId(req.params.id)}, {$set: {name: req.body.name}}, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200)
    })
});

app.delete('/artists/:id', (req, res) => {
    db.get().collection('artists').deleteOne({_id: objectId(req.params.id)}, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        res.sendStatus(200);

    })
});

db.connect('mongodb://localhost:27017/node-js-api-database', { useNewUrlParser: true }, (err) => {
    if (err) {
        return console.log(err);
    }

    app.listen(3012, () => {console.log('API app started')});
});
