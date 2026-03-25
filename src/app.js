import express from "express" // to handle the server and its routes.
import cors from "cors" // it is a middleware used to allow cross-origin requests, which is essential for frontend-backend communication when they are hosted on different domains or ports.
import cookieParser from "cookie-parser" // it is a middleware which is used to parse the cookies coming in the request headers. It makes it easier to access the cookies in the request handlers.

const app = express() // creating an express app.

// importing custom utilities
import { asyncHandler } from "./utils/asyncHandler.js"
import { ApiResponse } from "./utils/ApiResponse.js" // standard response structure
import { ApiError } from "./utils/ApiError.js" // standard error structure


// ------------------------------------------------ MIDDLEWARES -------------------------------------------------------

// Express application me jo middlewares hum use karte hain, wo do types ke hote hain: built-in aur external (npm packages). 
// cors--> ek external middleware hai jo Express ke andar by default available nahi hota, isliye ise use karne ke liye pehle 
// npm install cors karke install karna padta hai aur phir import cors from "cors" ke through explicitly import karna padta 
// hai. Dusri taraf, express.json(), express.urlencoded() aur express.static() jaise middlewares Express framework ke andar 
// hi built-in hote hain. Jab hum import express from "express" karte hain, to ye saare methods automatically available ho
// jaate hain, isliye inhe alag se import karne ki zarurat nahi padti


// Applying CORS middleware
// origin → kaunsa frontend backend ko request bhej sakta hai (allowed domain/port)
// credentials: true → cookies, tokens, authentication data ko allow karta hai from the frontend.
app.use(cors({ 
  origin: process.env.FRONTEND_URL, 
  credentials: true
}))


// express.json : it is a middleware used to accept the data coming from the frontend in JSON format
// example → { "name": "Tarun", "age": 21 }
// bina iske req.body undefined ho jayega (POST/PUT requests me problem aayegi)
app.use(express.json({ limit: "16kb" }))


// express.urlencoded : it is a middleware used to accept the data coming from the frontend in URL-encoded format
// example → name=Tarun&age=21 (form submission)
// extended: true → complex objects and arrays ko allow karta hai
// bina iske form data read nahi hoga
app.use(express.urlencoded({ 
  extended: true, 
  limit: "16kb" 
}))


// express.static : it is a middleware used to serve static files like images, css, js etc. from the public folder
// example → http://localhost:8000/logo.png (agar public folder me present hai)
// bina iske browser directly static files access nahi kar paayega
app.use(express.static("public"))


app.use(cookieParser())
// cookie-parser ek middleware hai jo incoming request ke header(header to object format mai hai pr usmai aane wali cookie string format mai hoti hai)
// me aane wali cookies ko parse karke unhe easily usable format me convert karta hai .
//  z Jab browser backend ko request bhejta hai, to cookies req.headers.cookie me ek raw string ke form me aati hain,
// jise directly use karna difficult hota hai. app.use(cookieParser()) lagane ke baad ye raw cookie string ko ek JavaScript 
// object me convert kar deta hai, jise hum req.cookies ke through easily access kar sakte hain. Iska main use authentication 
// systems me hota hai, jaise JWT tokens ko cookies me store karke verify karna, user sessions manage karna, ya user-specific 
// data handle karna.
// Agar cookie-parser middleware use na kiya jaye, to developer ko cookies ko manually parse karna padega, jo complex aur error-prone
// ho sakta hai. Isliye ye middleware backend development me bahut helpful hota hai, especially jab hum login/signup systems,
// secure authentication, ya session management implement kar rahe hote hain.


// ------------------------------------------ CUSTOM MIDDLEWARES -------------------------------------------------------

// Custom middleware wo middleware hote hain jo developer apni specific needs ke according khud banata hai. Express framework kuch
// built-in middlewares deta hai (jaise express.json()), aur kuch external middlewares npm se use kiye jaate hain (jaise cors, cookie-parser), 
// lekin jab hume kisi special logic ki zarurat hoti hai — jaise authentication check karna, request logging karna, ya data validate karna 
// — tab hum apna khud ka middleware function likhte hain, jise custom middleware kaha jata hai. Ye middleware request aur response ke beech
// me execute hota hai aur next() function ke through aage ke middleware ya route handler ko control pass karta hai. Is tarah custom middleware
// backend me flexibility aur control provide karta hai, jisse hum apni application ke behavior ko easily customize kar sakte hain.

// Middleware 1 → Logger
const logger = (req, res, next) => { 
    // next ka matlab hai ki ye middleware complete hone ke baad next middleware pe jao
    // agar next() nahi likhenge, toh request yahin ruk jayegi
    console.log("Request received")
    next()
}


// Middleware 2 → Simple Security Check
const securityCheck = (req, res, next) => {

    const value = req.headers.authorization 
    // request jab aati hai to uske sath uska header bhi aata hai (object format mai), 
    // jisme bohot saari info hoti hai , jese ki authorization token , content type , cookies etc .

    // agar token sahi hai → allow request
    if (value === "12345") {
        next()
    }
    else {
        throw new ApiError(401, "Unauthorized Access")
    }
}


// -------------------------------------------- APPLYING CUSTOM MIDDLEWARES ------------------------------------------------

// pehle logger chalega → fir security check -> fir routes execute honge.
app.use(logger)
app.use(securityCheck)


// ---------------------- ROUTES ----------------------

// ye route tabhi chalega jab security check middleware pass ho jayega 
// asyncHandler use kiya hai taaki async errors automatically handle ho jaye


// Since server ke different routes par request aati hai aur unko process hone me time lag sakta hai
// (jaise DB call, API call, etc.), isliye hum route ke callback ko async banate hain.
// async function use karne ka benefit ye hai ki hum await ka use karke async operations ko easily handle kar sakte hain.

// Lekin jab hum async use karte hain, to sirf response hi nahi balki error bhi aa sakti hai
// isliye normally hume try-catch block use karna padta hai.

// Par Problem ye hai ki har route me baar-baar try-catch likhna repetitive aur messy ho jata hai.
// Isilye hum ek asyncHandler bana lete hain jo internally try-catch handle kare
// aur aane wali errors ko automatically next() me pass kar de.

app.get("/", asyncHandler(async (req, res) => {

    // dummy data (real project me DB se aata hai)
    const data = { text: "Welcome Tarun" }
    res
      .status(200)
      .json(new ApiResponse(200, data, "Access Granted"))
}))


app.get("/admin", asyncHandler(async (req, res) => {

    const user = null
    res.json(new ApiResponse(200, user))
}))

app.get("/check-age", asyncHandler(async (req, res) => {

    const age = 15  
    if (age < 18) {
        throw new ApiError(400, "You are underage")
    }
    res.json(new ApiResponse(200, { age }, "Access allowed"))
}))


// ---------------------- EXPORT ----------------------

export { app }