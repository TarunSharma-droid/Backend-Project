// Another Techniques to connect Database.

import dotenv from "dotenv" 
dotenv.config({
    path:'./env'
})
// to use this method of importing .env file we have to make changes in the "dev" in json file.
// Kyunki import statement async hota hai — matlab Node baaki files load karna 
// shuru kar deta hai dotenv ke load hone se pehle. Toh environment variables time pe available nahi hote.
// Isliye -r dotenv/config flag use karte hain jo sabse pehle load hota hai.

import mongoose from "mongoose"
import express from "express"

// Starting an express application
const app = express()   // creates an Express application instance

// to connect database
import {DB_NAME} from "./constants.js"

async function connectDB (){   // async is used because database connection is an asynchronous operation
    try {

        // connect to MongoDB database
        // await makes Node.js wait until the database connection is completed
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        console.log("Successfully DB is connected")

        // app.listen() starts the HTTP server and makes it listen for incoming requests
        // internally Express uses Node.js http module to create the server
        // app.listen() server banata hai, lekin us server ko request handle karne ke liye express() app chahiye hota hai.
        // isi liye hamne upr express app bhi banai hai.

        const server = app.listen(process.env.PORT, () => {              
            console.log(`Server running on port ${process.env.PORT}`)  
        })

        // if the server fails to start or encounters an error,
        // it emits an "error" event which is handled here
        server.on("error", (error) => {                            
            console.log("Server Error:", error)
        })

    }
 
    catch (error){                    
        // this block runs if MongoDB connection fails
        console.log("MongoDB connection failed", error)
    }
}

// calling the function to start DB connection and server
connectDB()



// In backend apps we usually follow this pattern:

//           Start application
//                  ↓
//           Connect Database
//                  ↓
//         If DB connected → Start Server
//                  ↓
//         Server starts listening

// We have written the code to start the server inside the try block
// If database connection fails, the code jumps to catch and server will not start. Which is good, because: Server without DB = useless 


/* Execution Flow of Correct Code
                Program starts
                    ↓
                connectDB() called
                    ↓
                Try block
                    ↓
                await mongoose.connect()
                    ↓
                DB connected
                    ↓
                Server starts listening

If DB fails to connect:

                Program starts
                    ↓
                connectDB()
                    ↓
                mongoose.connect()
                    ↓
                Error
                    ↓
                catch block runs
                    ↓
                server never starts */
