const express = require ("express")
const mongoose = require ("mongoose")
const dotenv = require("dotenv")
const router = require("./src/routers/authRoutes")
router
dotenv.config()
const app = express()
app.use(express.json())
app.use("/api", router)
const PORT = process.env.PORT || 4000
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("APP NOW CONNECTED...")
})
app.listen(PORT, () =>{
    console.log(`app now listening at port ${PORT}`)
})