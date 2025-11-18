const express = require("express")
const Auth = require("../models/authmodel")
const generateOtp = require("../../utils/generateOtp")
const sendOtp = require("../../utils/sendOtpMail")
const bcrypt = require("bcrypt")
const signUp = async(req, res) => {
    try {
        const{firstName, lastName, email, dob, bvn, mobile, passWord} = req.body
        const validPassWord = (passWord) => {
            const hasUpperCase = /[A-Z]/.test(passWord)
            const hasLowerCase = /[a-z]/.test(passWord)
            const hasSpecialCharacter = /[!@#$%^&*()+.,/<>';:']/.test(passWord)
            const hasAnInteger = /[0-9]/.test(passWord)
            const length = passWord.length >= 8
            
        if(!hasUpperCase) return "password must include at least an uppercase"
        if(!hasLowerCase) return "password must have at least one lowercase"
        if(!hasSpecialCharacter) return "password must have at least one special character (@!#$%^&*()_+=.,/)"
        if(!hasAnInteger) return "password must have at least one integer (0123456789)"
        if(!length) return "password must be at least 8 digits"

        return null
       
        }
        const passWordError = validPassWord(passWord)
        if (passWordError) {
            return res.status(400).json(passWordError)
        }
        const hashedPassWord = await bcrypt.hash(passWord, 12)
        const existingUser = await Auth.findOne({email})
        if(existingUser){
            return res.status(400).json("User exists!")
        }
        const otp = generateOtp()
    await sendOtp(email, otp)
        const user = new Auth({firstName, lastName, email, dob, bvn, mobile, 
            passWord:hashedPassWord, verificationCode : otp, isVerified:false, otpExpiration: Date.now() + 5 * 60 * 1000})
        
        await user.save()
        res.status(201).json("OTP successfully sent to your email!")
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
module.exports =signUp