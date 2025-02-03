const express = require("express");
const TransactionsModel = require("../models/transactionsModel");
const { getDateAggregationRule } = require("../helper/aggregationHelper");


const TransactionsRouter = express.Router();



//get All
TransactionsRouter.get("/getAll", async(req, res)=>{
    try {
        let {startDate, endDate} = req.query;

        const allTransactions = await TransactionsModel.find({userId: req.body.userId, ...(getDateAggregationRule(startDate, endDate))}).select("-userId").sort({ date : -1 });
        const totalDataCount = (await TransactionsModel.find({userId: req.body.userId})).length;
        res.status(200).send({allTransactions, totalDataCount});
    } catch (error) {
        res.status(500).json({status: 0, message: "Unable to get Transactions", error})
    }
})


//add 
TransactionsRouter.post("/add", async(req, res)=>{
    try {

        const newTransaction = new TransactionsModel({
            ...req.body
        });

        await newTransaction.save();

        res.status(201).json({status: 1, message: "Transaction Saved Sucessfully.", transaction: newTransaction})

        
    } catch (error) {
        res.status(500).json({status: 0, message: "Failed to add transaction.", error})
    }
})


//update
TransactionsRouter.put("/update/:id", async(req, res)=>{
    try {
        const updatedTransaction = await TransactionsModel.findByIdAndUpdate(req.params.id, {...req.body}, {new: true});
        res.status(201).json({status: 1, message: "Transaction update Sucessfully.", transaction: updatedTransaction})
        
    } catch (error) {
        res.status(500).json({status: 0, message: "Failed to update transaction.", error})
    }
})


//delete
TransactionsRouter.post("/delete", async(req, res)=>{
    try {
        const deletedTransaction =  await TransactionsModel.deleteMany({
            _id: { $in:  req.body.transactionIds}
        });

        res.status(201).json({status: 1, message: "Transaction deleted Sucessfully.", transaction: deletedTransaction})

    } catch (error) {
        res.status(500).json({status: 0, message: "Failed to delete transaction.", error})
    }
})






module.exports = TransactionsRouter;