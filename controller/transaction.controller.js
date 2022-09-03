const express = require('express');
const Transaction = require('../service/transaction.service');
module.exports = {
    GetAllTransactionList: async (req, res) => {
        let ITEMS_PER_PAGE = 15;
        const page = +req.query.page
        const offset_eqn = ((page - 1) * ITEMS_PER_PAGE)
        const transaction = await Transaction.GetAllTransaction({ ITEMS_PER_PAGE, page, offset_eqn })
        if (transaction.length  == 0) return res.status(404).json({ data: 'No data found' })
        res.status(201).json({ data: transaction })
    },
    GetUserTransactionList: async (req, res) => {
        let ITEMS_PER_PAGE = 5;
        let user_id = req.body.user_id
        const page = +req.query.page
        const offset_eqn = ((page - 1) * ITEMS_PER_PAGE)
        const transaction = await Transaction.GetUserTransaction({ ITEMS_PER_PAGE, user_id, page, offset_eqn })
        if (transaction.length  == 0) return res.status(404).json({ data: 'No data found' })
        res.status(201).json({ data: transaction })
    },
    GetSingleTransaction: async (req, res)=>{
        const id = req.params.id
        const transaction = await Transaction.GetSingleTransaction(id)
        if (!transaction) return res.status(404).json({ data: 'No data found' })
        res.status(201).json({ data: transaction })
    }
}