const alternateAccountNumber = require("../../utils/generateAccountNumber");
const Auth = require("../models/authmodel");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const logIn = async (req, res) => {
    try{
    const {identifier, passWord} = req.body
    if (!identifier || !passWord) {
        return res.status(400).json("Enter your email or account number and password!")
    }
    let user
    if (identifier.includes("@")) {
        user = await Auth.findOne({email:identifier})
    } else {
        user = await Auth.findOne({ mobile:identifier  })
    }
    if (!user) {
        return res.status(400).json("Incorrect login credentials!")
    }
    const verifyPassWord = await bcrypt.compare(passWord, user.passWord)
    if (!verifyPassWord) {
        return res.status(400).json("Invalid credentials!")
    }
    const accessToken = jwt.sign(
        {_id:user?._id, accountNumber:user.accountNumber},
        process.env.ACCESS_TOKEN,
        {expiresIn:"5m"}
    )

res.status(200).json({message:"logIn successful!", accessToken})
}
catch (error){
res.status(500).json(error)
}
}

module.exports = logIn