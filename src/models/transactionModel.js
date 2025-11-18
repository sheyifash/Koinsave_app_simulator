const mongoose = require("mongoose")
const Auth = require("./authmodel")

const transactionSchema = new mongoose.Schema({
    transactionId:{type:String, unique:true, required:true},
    transactionType:{type:String, enum:["transfer", "recieve"], required:true},
    amount:{type:Number, required:true, min:0.01},
    sender:{type:mongoose.Schema.Types.ObjectId, ref:Auth, required:true},
    receiver:{type:mongoose.Schema.Types.ObjectId, ref:Auth, required:true},
    senderAccountNumber:{type:String},
    receiverAccountNumber:{type:String},
    status:{type:String, enum:["success", "pending", "failed"]},
    createdAt:{type:Date, default:Date.now}
})

transactionSchema.index({transactionId:1})
transactionSchema.index({sender:1, createdAt: -1})
transactionSchema.index({receiver:1, createdAt: -1})

const Transactions = new mongoose.model("Transactions", transactionSchema)

module.exports = Transactions