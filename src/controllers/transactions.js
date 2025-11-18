const mongoose = require ("mongoose")
const Auth = require("../models/authmodel")
const Transactions = require("../models/transactionModel")

const sendMoney = async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const{receiverAccountNumber, amount} = req.body
        if (!receiverAccountNumber || !amount) {
            return res.status(401).json("Please enter Beneficiary account number and amount.")
        }
        if (amount<=0) {
            return res.status(401).json("amount should be greater than 0.")
        }
        const receiver = await Auth.findOne({accountNumber:receiverAccountNumber})
        if (!receiver) {
            return res.status(401).json("Invalid account number!")
        }
        const sender = await Auth.findById(req.user._id).session(session)
        if (!sender) {
            return res.status(401).json("please logIn!")
        }
        if (sender.accountNumber === receiverAccountNumber) {
            return res.status(400).json("you can not  send money to yourself!")
        }
        if (amount > sender.balance) {
            return res.status(401).json("Insufficient balance!")
        }
        sender.balance -= amount
        await sender.save({session})
        receiver.balance += amount
        await receiver.save({session})
        const newTransaction = new Transactions({
            sender:sender._id,
            receiver:receiver.accountNumber,
            amount,
             status: "success",
            transactionId:`TFX-${Date.now()}`
        })

        await newTransaction.save({session})
        await session.commitTransaction()
        session.endSession()

        res.status(200).json({message:"Transaction successful", newTransaction})
    } catch (error) {
        await session.abortTransaction()
            session.endSession()

        console.error("transfer error", error)
        res.status(500).json({
            message:"transaction failed", error:error.message
        })
    }
}

module.exports = sendMoney