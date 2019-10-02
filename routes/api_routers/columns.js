const express = require('express');
const router = express.Router();
const { postController, getController, idGetController,
    idPutController, idDelController } = require("../../controllers/api/column_controllers");

// url: /api/columns

router.post('/', postController);
router.get('/', getController);
router.get('/:id', idGetController);
router.put('/:id', idPutController);
router.delete('/:id', idDelController);

module.exports = router;