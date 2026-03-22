import dotenv from "dotenv" 
dotenv.config({path:'./.env'})

// required('dotenv').config({path: './env'})  --> another method of importing .env file
// for it we not need to edit "dev" in the json because "require" is synchronous —
// matlab ye line poori hone ke baad hi agle line pe jaata hai. 
// Toh .env file pehle load hoti hai, phir baaki code.

import connectDB from "./database"  // import is async is nature so it returns a promise. 
import { app } from "./app"

connectDB() // agar connectDB() successful hota hai (matlb try successful hota hai) toh .then() wala block run hoga. Varna to process.exit(1) run hoga, jiska matlab hai ki app ko chalane ka koi point nahi hai, toh app ko shut down kar do.
.then(()=>{       
    app.listen(process.env.PORT , () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})  
.catch((error) => {  // vese to ye useless hai, kyunki connectDB() ke andar hi error handle kar liya gaya hai, lekin fir bhi catch block rakhna chahiye, just for safety.
    console.log("Database Connection Failed",error)
})


