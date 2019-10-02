const express = require('express');
const router = express.Router();
const { onlyAdmin } = require("../../auth");
const { postController, getController, idGetController,
        idPutController, idDelController } = require("../../controllers/admin/user_controllers");

// url: /admin/users

router.post('/', onlyAdmin, postController);
router.get('/', onlyAdmin, getController);
router.get('/:id', onlyAdmin, idGetController);
router.put('/:id', onlyAdmin, idPutController);
router.delete('/:id', onlyAdmin, idDelController);

module.exports = router;