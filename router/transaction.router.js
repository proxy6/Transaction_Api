const { GetAllTransactionList, GetUserTransactionList, GetSingleTransaction } = require('../controller/transaction.controller')
const  {isAuthorized}  = require('../middleware/auth')

const router = require('express').Router()

router.post('/', isAuthorized, GetUserTransactionList)
router.get('/all', isAuthorized, GetAllTransactionList)
router.get('/:id', isAuthorized, GetSingleTransaction)

module.exports = router