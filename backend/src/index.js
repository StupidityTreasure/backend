require ('dotenv').config

import mongoose from "mongoose"
import { DB_NAME } from "./constatnts";

import connectDB from "./db/index.js";

configDotenv.config({
    path:'./env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port:${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("Mongo db connection failed !! ,err")
})






/*
import express from "express"

const app=express()
;(async()=>{
    try{
        await mongoose.connect(`${
            process.env.MONGODB_URI
        }/${DB_NAME}`)
        app.on("error",()=>{
            console.log(error)
            throw error
        })

        app.listen(process.env.PORT,() => {
            console.log(`app is listening on port ${process.env.PORT}`)
        })
    }catch(error){
        console.log(error)
        throw err
    }
})()
*/