import mongoose from "mongoose"
import {DB_NAME} from "./constants.js"
import dotenv from "dotenv"
import connnetDB from "./db/index.js"

dotenv.config({
    path : './env'
})

connnetDB()












// import express from "express"
// const app = express()

// ( async() => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (err) => {
//             console.error("Error connecting to MongoDB", err)
//             throw err
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error("Error",error)
//     }
// })()