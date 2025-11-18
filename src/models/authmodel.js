const mongoose = require("mongoose")
const authSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    mobile:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    bvn:{type:Number, required:true},
    dob:{type:Date, default:null},
    passWord:{type:String, required:true},
    verificationCode:{type:String, default:0},
    isVerified:{type:Boolean, default:false},
    otpExpiration:{type:Date},
    accountNumber:{type:String, default:null},
    alternateAccountNmber:{type:String, default:null},
    balance:{type:Number, default:0}
}, {timestamps:true})

const Auth = new mongoose.model("Auth", authSchema)
module.exports = Auth