const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
    res.send(artists);
});

app.get('/artists/:id', (req, res) => {
    let artist = artists.find((artist) => {
        return artist.id === Number(req.params.id);
    });

    res.send(artist);
});

app.post('/artists', (req, res) => {
    let artist = {
        id: Date.now(),
        name: req.body.name,
    };

    artists.push(artist);
    res.send(artist);
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

app.listen(3012, () => {console.log('API app started')});