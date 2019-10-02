const express = require('express');
const router = express.Router();
const columnsRouter = require('./columns');
const cardsRouter = require('./cards');
const logsRouter = require('./logs');
const projectsRouter = require('./projects');

// url: /api

router.use('/columns', columnsRouter);
router.use('/cards', cardsRouter);
router.use('/logs', logsRouter);
router.use('/projects', projectsRouter);

module.exports = router;