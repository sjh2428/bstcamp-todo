const express = require('express');
const router = express.Router();

// url: /

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/sign-in', (req, res) => {

});

router.post('/sign-up', (req, res) => {

});

router.get('/todo', (req, res) => {

});

router.get('/todo/:id', (req, res) => {

});

module.exports = router;