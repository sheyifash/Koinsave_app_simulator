const jwt = require ("jsonwebtoken")
const Auth = require("../models/authmodel")
const authorization = async(req, res, next) => {
    try{
const token = req.header("Authorization")
if (!token) {
    return res.status(401).json("Please logIn!")
}
const splitToken = token.split(" ")
const realToken = splitToken[1]
const decodedToken = jwt.verify(realToken, process.env.ACCESS_TOKEN)
if (!decodedToken) {
    return res.status(401).json("Please sign in!")
}
const user = await Auth.findById(decodedToken._id)
if (!user) {
    return res.status(404).json("User does not exist!")
}
req.user = user
next()
}
catch(error){
res.status(500).json({error:error.message})
}
}
module.exports = authorization