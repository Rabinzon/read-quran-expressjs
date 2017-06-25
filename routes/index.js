const express = require('express');
const router = express.Router();
// const model = require('../models/krac');
const json = require('../views/index.json');

const handler = (req, res) => {
    res.render('index', {data:json})
};

router.get('/', handler);

module.exports = router;
