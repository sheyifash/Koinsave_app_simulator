const Auth = require("../models/authmodel")
//const accountNumber = require("../../generateAccountNumber")
const {generateAccountNumber, alternateAccountNumber} = require("../../utils/generateAccountNumber")
const verifyOtp = async(req, res) => {
    try {
    const {email, otp} = req.body
    const user = await Auth.findOne({email})
    if(!user){return res.status(400).json("invalid user!")}
    
    if (otp != user.verificationCode) {
        return res.status(400).json("invalid OTP!")
    }
    if (Date.now() > user.otpExpiration) {
        return res.status(400).json("OTP has expired! kindly request a new one.")
    }
    user.isVerified=true

    user.accountNumber = await generateAccountNumber("522")
    user.alternateAccountNumber = await alternateAccountNumber(user.mobile)

    await user.save()

    res.status(200).json({message:"OTP successfully verified!",
        accountNumber:user.accountNumber,
        alternateAccountNumber:user.alternateAccountNumber
    })
} catch (error) {
    console.log(error)
        res.status(500).json({error:error.message})
}
}
 module.exports = verifyOtp