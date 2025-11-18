const express = require("express")
const sendMoney = require("../controllers/transactions")
const authorization = require("../middlewares/authorizationMiddleware")
const routers = express.Router()

routers.post("/transfer", authorization, sendMoney)

module.exports = routers