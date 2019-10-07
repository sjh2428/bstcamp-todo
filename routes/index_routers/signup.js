const express = require('express');
const router = express.Router();
const { signUpGetController, signUpPostController } = require("../../controllers/index/sign_up_controller");

router.get('/', signUpGetController);
router.post('/', signUpPostController);

module.exports = router;