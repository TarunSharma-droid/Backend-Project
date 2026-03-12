
// To import the connection of database from the database's folder's file

required('dotenv').config({path: './env'})  // another method of importing .env file
// for it we not need to edit "dev" in the json
// Kyunki require synchronous hota hai — matlab ye line poori hone ke baad hi agle line pe jaata hai. 
// Toh .env file pehle load hoti hai, p hir baaki code.
import connectDB from "./database" 

connectDB()