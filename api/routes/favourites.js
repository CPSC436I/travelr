var express = require('express');
var router = express.Router();
const Favourite = require('../models/Favourite');

/* GET favourites listing. */
router.get('/', function(req, res, next) {
    Favourite.find()
    .then(favourites => {
        res.json(favourites);
    })
    .catch(err => {
        res.json(err);
    })
});


/* POST a favourite */
router.post('/', function(req, res, next) {
    Favourite.create(req.body)
    .then(favourite => {
        res.json(favourite)
        .catch(err => res.json(err));
    })
});

/* DELETE a favourite */
router.delete('/:id', function(req, res, next) {
    console.log(req.params.id);
    Favourite.findOneAndDelete({id: req.params.id})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;
