const express = require('express');
const { Transaction } = require('sequelize/types');
module.exports = {
    GetTransactionList: async(req, res)=>{
        const transaction = await Transaction.GetList
    }
}