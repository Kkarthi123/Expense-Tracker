const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    type: {
        type: Number,
        enum: [0,1],
        default: 0
    },
    category: String,
    amount: Number,
    description: String,
    paymentMode: {
        type: Number,
        enum:[0,1,2],
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
},
{
    timestamps: true,
})


const TransactionsModel = mongoose.model("TransactionsModel", transactionsSchema)


module.exports =  TransactionsModel;