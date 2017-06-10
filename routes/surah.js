const express = require('express');
const router = express.Router();
const model = require('../models/krac');

const handler = ({ params: { id } }, res) =>
    model
        .findOne({chron: id},
            (err, data) => res.render('surah', data));

router.get('/:id', handler);

module.exports = router;
