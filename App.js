const express = require('express')
const morgan = require('morgan')
const games = require('./playstore')
const app = express()
app.use(morgan('common'))


app.get('/apps', (req, res) => {
    const { genre, sort } = req.query

    if(sort) {
        if(!['Title', 'Rating'].includes(sort)) {
            return res.status(400).send('Sort must be Title or Rating')
        }
    }

    if (genre) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res
                .status(400)
                .send('Genre must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, Card')
        }
    }

    let response = games.filter(game =>game.Genres.includes(genre))

    if (sort) {
        if('Title') {
        response
            .sort(function(a, b) {
                var nameA = a.App.toUpperCase(); // ignore upper and lowercase
                var nameB = b.App.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                return -1;
                }
                if (nameA > nameB) {
                return 1;
                }
            })
        }
        if('Rating'){
            response
            .sort(function (a, b) {
                return a.Rating - b.Rating;
              });
        }
    }
    
    res.send(response)
})

app.listen(8000, () => {
    console.log('app started')
})