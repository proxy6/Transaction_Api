const { SignUp, Login } = require('../controller/user.controller')

const router = require('express').Router()


router.post('/signup', SignUp)

router.post('/login', Login)

module.exports = router