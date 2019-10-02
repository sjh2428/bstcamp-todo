const express = require('express');
const router = express.Router();
const { postController, getController, idGetController,
        idPutController, idDelController } = require("../../controllers/api/card_controllers");

// url: /api/cards

router.post('/', postController);
router.get('/', getController);
router.get('/:id', idGetController);
router.put('/:id', idPutController);
router.delete('/:id', idDelController);

module.exports = router;