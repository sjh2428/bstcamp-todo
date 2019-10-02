const express = require('express');
const router = express.Router();
const { indexGetController, signInGetController, signUpPostController, 
    todoGetController, todoIdGetController } = require("../controllers/index_controllers");

// url: /

/* GET home page. */
router.get('/', indexGetController);
router.get('/sign-in', signInGetController);
router.post('/sign-up', signUpPostController);
router.get('/todo', todoGetController);
router.get('/todo/:id', todoIdGetController);

module.exports = router;