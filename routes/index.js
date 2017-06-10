const express = require('express');
const router = express.Router();
const model = require('../models/krac');

const handler = (req, res) => {
    model.find({})
        .sort('chron')
        .exec((err, data) => res.render('index', {data}))
};

router.get('/', handler);

module.exports = router;
