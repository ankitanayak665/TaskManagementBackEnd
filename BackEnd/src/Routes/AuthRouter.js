const router = require('express').Router();
const {signUpValidation} = require("../Middlewares/AuthValidation")
const {signup} = require("../Controllers/AuthController")
const {loginValidation} = require("../Middlewares/AuthValidation")
const {login} = require("../Controllers/AuthController")

router.post('/login',loginValidation,login)
router.post('/signUp',signUpValidation,signup)

  module.exports = router;