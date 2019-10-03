const express = require('express');
const router = express.Router();
const { postController, getController, idGetController,
    idPutController, idDelController } = require("../../controllers/api/log_controllers");

// url: /api/logs

router.route('/')
    .post(postController)
    .get(getController);

router.route('/:id')
    .get(idGetController)
    .put(idPutController)
    .delete(idDelController);

module.exports = router;