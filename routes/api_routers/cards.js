const express = require('express');
const router = express.Router();
const { postController, getController, idGetController,
        idPutController, idDelController } = require("../../controllers/api/card_controllers");
const { doYouHaveRAuth, doYouHaveRWAuth } = require("../../modules/auth");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// url: /api/cards

router.route('/')
    .post(doYouHaveRWAuth, upload.array('files'), postController)
    .get(doYouHaveRAuth, getController);

router.route('/:id')
    .get(doYouHaveRAuth, idGetController)
    .put(doYouHaveRWAuth, upload.array('files'), idPutController)
    .delete(doYouHaveRWAuth, idDelController);

module.exports = router;