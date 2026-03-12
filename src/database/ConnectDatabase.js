// Method is database folder mai file bana ke connection likho or usko import kara lo index file mai

import mongoose from "mongoose"
import {DB_NAME} from "./constants.js" 
const connectDB = async () => {

    try {
        await mongoose.connect(`${process.env.MONODB_URL}/${DB_NAME}`)
        console.log(`MongoDB is connected !! DB HOST : ${connectionInstance.connection.host}`)
    }

    catch(error){
        console.log("Connection Error" , error)
        process.exit(1) // process.exit(1) = "When DB failed to connect, there's no point running this app, SHUT IT DOWN using it.
    }
}

export default connectDB