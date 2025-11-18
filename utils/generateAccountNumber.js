const Auth = require("../src/models/authmodel");
const generateAccountNumber = async (prefix = "522") => {
    let accountNumber;
    let exists = true
    const totalLength = 10
   // let randomDigitLength = totalLength - prefix.length

    while (exists) {
        const randomDigitLength = Math.floor(1000000 + Math.random() * 9000000).toString()
    
    accountNumber = prefix + randomDigitLength
    exists = await Auth.findOne({accountNumber})
}
    return accountNumber
}

const alternateAccountNumber = async (mobile) => {
    if (mobile.startsWith(0)) {
        return mobile.slice(1)
    }
    return mobile
}
module.exports = {
    generateAccountNumber,
    alternateAccountNumber
}