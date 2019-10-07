const express = require('express');
const router = express.Router();
const { todoGetController, todoIdGetController } = require("../../controllers/index/todo_controller");

router.get('/', todoGetController);
router.get('/:id', todoIdGetController);

module.exports = router;