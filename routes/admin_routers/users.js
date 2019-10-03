const express = require('express');
const router = express.Router();
const { postController, getController, idGetController,
        idPutController, idDelController } = require("../../controllers/admin/user_controllers");

// url: /admin/users

router.route('/')
    .post(postController)
    .get(getController);

router.route('/:id')
    .get(idGetController)
    .put(idPutController)
    .delete(idDelController);

module.exports = router;