const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

let objectId = require('mongodb').ObjectId;
const app = express();
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

let artists = [
    {
        id: 1,
        name: 'Metallica',
    },
    {
        id: 2,
        name: 'Iron Maiden',
    },
    {
        id: 3,
        name: 'Deep Purple',
    },
];

app.get('/', (req, res) => {
    res.send('Hello API');
});

app.get('/artists', (req, res) => {
    db.collection('artists').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
});

app.get('/artists/:id', (req, res) => {
    db.collection('artists').findOne({_id: objectId(req.params.id)}, (err, doc) => {
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

    db.collection('artists').insert(artist, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.send(artist);
    });
});

app.put('/artists/:id', (req, res) => {
    let artist = artists.find((artist) => {
        return artist.id === Number(req.params.id);
    });
    artist.name = req.body.name;
    res.send(artist);
});

app.delete('/artists/:id', (req, res) => {
    artists = artists.filter(artist => {
        return artist.id !== Number(req.params.id);
    });
});

MongoClient.connect('mongodb://localhost:27017/myapi', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log(err);
    }

    db = client.db('node-api-db');
    app.listen(3012, () => {console.log('API app started')});
})
