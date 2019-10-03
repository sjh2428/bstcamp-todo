const express = require('express');
const router = express.Router();
const { todoGetController, todoIdGetController } = require("../../controllers/index_controllers");

router.get('/', todoGetController);
router.get('/:id', todoIdGetController);

module.exports = router;