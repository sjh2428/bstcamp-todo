const express = require('express');
const router = express.Router();
const columnsRouter = require('./columns');
const cardsRouter = require('./cards');
const logsRouter = require('./logs');
const projectsRouter = require('./projects');
const { onlyPrivate } = require("../../modules/auth");

// url: /api

router.all('*', onlyPrivate);
router.use('/columns', columnsRouter);
router.use('/cards', cardsRouter);
router.use('/logs',  logsRouter);
router.use('/projects',  projectsRouter);

module.exports = router;