const express = require('express');
const router = express.Router();
const columnsRouter = require('./columns');
const cardsRouter = require('./cards');
const logsRouter = require('./logs');
const projectsRouter = require('./projects');
const { onlyPrivate } = require("../../modules/auth");

// url: /api

router.use('/columns', onlyPrivate, columnsRouter);
router.use('/cards', onlyPrivate, cardsRouter);
router.use('/logs', onlyPrivate, logsRouter);
router.use('/projects', onlyPrivate, projectsRouter);

module.exports = router;