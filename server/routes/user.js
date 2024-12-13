const router = require('express').Router();
const userContoller = require('../controllers/userController');

router.get('/:id', userContoller.getUserbyId);

module.exports = router;