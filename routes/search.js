const R = require('ramda');
const express = require('express');
const router = express.Router();
const model = require('../models/krac');

const filter = (results, regExp) => {
    return R.pipe(
        R.map(
            R.pipe(
                R.path(['ayats']),
                R.filter(({text}) => regExp.test(text)),
                R.map((t) => {
                    t.text = t.text.replace(regExp, '<kbd>$1</kbd>');
                    return t;
                })
            )
        ),
        R.flatten
    )(results);
};

const handler = (req, res) => {
    const q = req.body.query;
    const regExp = new RegExp(`(${q.trim().toLowerCase()})`, "ig");
    model
        .find({'ayats.text': regExp})
        .sort('chron')
        .exec((err, results) => {
            if (results) {
                res.render('results', {ayats: filter(results, regExp)});
                return;
            }
            res.send(404, null);
        });
};

router.post('/', handler);

module.exports = router;
