const express = require('express');
const router = express.Router();
const { postController, getController, idGetController,
    idPutController, idDelController } = require("../../controllers/api/project_controllers");
const { doYouHaveRAuth, doYouHaveRWAuth, isItYours } = require("../../middleware/auth");

// url: /api/projects

router.route('/')
    .post(postController)
    .get(getController);

router.route('/:id')
    .get(doYouHaveRAuth, idGetController)
    .put(doYouHaveRWAuth, idPutController)
    .delete(isItYours, idDelController);

module.exports = router;