const router = require('express').Router();

const usersController = require('./user.controller');

router.route('/').get(usersController.getAll);

module.exports = router;
