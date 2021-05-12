const router = require('express').Router();

const usersController = require('./user.controller');

router.route('/').get(usersController.getAll).post(usersController.create);

router.route('/:userId').get(usersController.getById);

module.exports = router;
