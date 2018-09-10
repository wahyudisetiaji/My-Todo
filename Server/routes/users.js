var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user-controller') 

/* GET users listing. */
router.post('/signIn', UserController.signInUser);
router.post('/signUp', UserController.signUpUser);
router.post('/loginFacebook', UserController.logInFacebook);


module.exports = router;
