const express = require("express")
const signUp = require("../controllers/authContoller")
const authorization = require("../middlewares/authorizationMiddleware")
const logIn = require("../controllers/login")
const verifyOtp = require("../controllers/verifyOtp")
const router = express.Router()

router.post("/signUp", signUp)
router.post("/login", logIn)
router.post("/verifyOtp", verifyOtp)
module.exports = router
