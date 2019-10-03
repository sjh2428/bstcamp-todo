const express = require('express');
const router = express.Router();
const { postController, getController, idGetController,
        idPutController, idDelController } = require("../../controllers/api/card_controllers");
const { doYouHaveRAuth, doYouHaveRWAuth } = require("../../modules/auth");

// url: /api/cards

router.route('/')
    .post(doYouHaveRWAuth, postController)
    .get(doYouHaveRAuth, getController);

router.route('/:id')
    .get(doYouHaveRAuth, idGetController)
    .put(doYouHaveRWAuth, idPutController)
    .delete(doYouHaveRWAuth, idDelController);

module.exports = router;