const express = require('express');
const router = express.Router();
const { projectGetController, projectIdGetController } = require("../../controllers/index/project_controller");

router.get('/', projectGetController);
router.get('/:id', projectIdGetController);

module.exports = router;