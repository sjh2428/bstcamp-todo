const express = require('express');
const router = express.Router();

// url: /admin/users

router.post('/', (req, res) => {

});

router.get('/', (req, res) => {
    console.log("/admin/users get");
    res.redirect("/");
});

router.get('/:id', (req, res) => {
    
});

router.put('/:id', (req, res) => {
    
});

router.delete('/:id', (req, res) => {
    
});

module.exports = router;