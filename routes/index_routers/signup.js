const express = require('express');
const router = express.Router();
const { signUpGetController, signUpPostController } = require("../../controllers/index_controllers");

router.get('/', signUpGetController);
router.post('/', signUpPostController);

module.exports = router;