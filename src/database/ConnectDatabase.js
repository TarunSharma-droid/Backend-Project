// Standard way is database folder mai file bana ke connection likho or usko import kara lo index file mai.

import mongoose from "mongoose" // will connect the server to the database.
import {DB_NAME} from "../constants.js" // double dot are used constants file is in parent folder of database folder.

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`) 
        console.log(`MongoDB is connected !!`)
    } 
    // DB_NAME ko URL ke sath use karne ka matlab hai ki MongoDB ko bataya ja raha hai
    // ki kis database ko target/use karna hai.
    // Agar wo database exist nahi karta, to wo tab create hoga jab usme data insert hoga.
    catch(error){
        console.log("Connection Error" , error)
        process.exit(1) // process.exit(1) = "When DB failed to connect, there's no point running this app, SHUT IT DOWN using it.
    }
}

export default connectDB 