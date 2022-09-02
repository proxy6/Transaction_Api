const router = require('express').Router()
const userRouter = require('./user.router')

router.get('/', (req, res)=>{
    res.send('Welcome to Transaction Api')
})

router.use('/user', userRouter)
// router.use('/transaction', transactionRoute)
module.exports = router