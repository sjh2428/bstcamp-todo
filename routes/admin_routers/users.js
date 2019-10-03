const express = require('express');
const router = express.Router();
const { postController, getController, idGetController,
        idPutController, idDelController } = require("../../controllers/admin/user_controllers");

// url: /admin/users

router.post('/', postController);
router.get('/', getController);
router.get('/:id', idGetController);
router.put('/:id', idPutController);
router.delete('/:id', idDelController);

module.exports = router;