const express = require('express');
const router = express.Router();
const { postController, getController } = require("../../controllers/api/log_controllers");
const { onlyPrivate } = require("../../middleware/auth");

// url: /api/logs

router.route('/')
    .all(onlyPrivate)
    .post(postController)
    .get(getController);

module.exports = router;