const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('this is home');
    res.render('index');
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    res.render('index');
});

module.exports = router;