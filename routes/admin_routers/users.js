const express = require('express');
const router = express.Router();
const { onlyAdmin } = require("../../auth");

// url: /admin/users

router.post('/', onlyAdmin, (req, res) => {

});

router.get('/', onlyAdmin, (req, res) => {
    console.log("/admin/users get");
    res.redirect("/");
});

router.get('/:id', onlyAdmin, (req, res) => {
    
});

router.put('/:id', onlyAdmin, (req, res) => {
    
});

router.delete('/:id', onlyAdmin, (req, res) => {
    
});

module.exports = router;