
import mongoose from 'mongoose'
import {Schema} from 'mongoose' 
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'


const userSchema = new Schema({

    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true, // it is used so that we can easily search the data in MongoDB.
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullname :{
        type : String,
        required : true,
        trim : true,
        index : true,
    },
    avatar : {
        type : String, // cloudinary url --> third party service in which we are going to store the image and giving its URL here.
        required : true,//means database me hum sirf URL store karein aur image ko cloudinary me store karein jis se database pr lode na ho.
    },

    coverImage : {
        type : String, // cloudinary url
    },

    watchHistory : {
        type : Schema.Types.ObjectId,
        ref : "Video"
    },

    password : {
        type : String,
        required : [true, 'Password is required']
    },

    refereshToken : {
        type : String,
    }

},
    {timestamp : true}
)
//-----------------------------------------------------------------------------------------------------------------------------------

userSchema.pre("save", async function(next){  // since pre is a middleware hence we have given next as a parameter in the function. 

    if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10)
        } 
        // 🔹 Agar password modify nahi hua → directly next()
        else {
            return next()
        }
})

// 🔹 Pre is a Middleware which is used for Password Hashing.

// pre("save") kya karta hai?
// Ye ek middleware (hook) hai jo save event se pehle run hota hai
// Matlab jab bhi tum .save() call karte ho → ye middleware automatically run ho jata hai save hone se pehle.

// Iska kaam hai user ka password secure tarike se database me store karna. 
// Hum pre middlwaare ke andar bcrypt library ka use kar rahe hain aur 10 rounds set kiye hain, jisse password hash karne me thoda time lage aur security badhe. 

// Middleware me check lagaya gaya hai ki agar password field mai user ne change kiya hai, to hashing skip ho jaye aur user save ho jaye. 
// Or agar password field mai change nhi hua hai to hasing ignore ho jaye aur user save ho jaye.

// Ye isliye important hai, kyunki agar user ne kisi aur field me change kiya aur password dobara hash ho jaye, 
// to original password corrupt ho sakta hai. 
// Par agar password change hua hai, to bcrypt apna kaam karega aur password ko hash karke store karega.

// Agar hashing me koi error aaye, to error next() ke through error handler ko bhej diya jata hai, 
// jisse server safe rahe aur error handle ho jaye.

//-----------------------------------------------------------------------------------------------------------------------------------

// Desigining custom method for checking the password is correct or not while login.

userSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password) // this.password is the hashed password stored in the database and password is the plain text password entered by the user.
}

// haumne is function ko simply define nhi kiya hai because we want to use "this" keyword inside the function, which refers to the current user document.
// return will give boolean value, true if the password matches and false if it does not match.

//-------------------------------------------------------------------------------------------------------------------------------------

// JWT tokens (access aur refresh) server ke secret strings se generate hote hain. Jab server user login karta hai, 
// ye payload (jaise userId) aur secret string ko combine karke token sign karta hai. Signature ensure karta hai ki 
// token tamper-proof hai aur payload me koi change nahi hua. Access token short-lived hota hai (1 day), refresh token
// long-lived (7 days), aur dono alag-alag secrets se sign hote hain. Secret strings .env me rakhe jate hain taaki 
// security maintain ho aur code me hardcode na ho. Har token ka signature secret string + payload se derive hota hai, 
// isliye server hi token verify aur generate kar sakta hai.

// "sign" is the method of jsonwebtoken library that is used to generate the signature. It takes three parameters, payload, secret and options.
// payload is the data that we want to store in the token. It can be anything like userId, username, email etc. 
// secret is the string that is used to sign the token. It should be kept secret and should not be shared with anyone. 
// so "sign" makes the token using the parameters we have passed and the secret string and returns the token which we can send to the client side.

userSchema.methods.generateAccessToken = function () {
    const payload = {
        userId : this._id, // we need not to create userId field in the schema because MongoDB automatically creates _id field for each document which is unique and can be used as userId.
        email : this.email,
        username : this.username,
    }

    return jsonwebtoken.sign( 
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    )
} 
// jo bhi user ye function call karega, uske liye ek access token generate hoga jisme userId, email aur username hoga, aur wo token 1 day ke liye valid hoga.
// res.json() --> Controller/Route file me likte hain --> ye use hota hai access token ko client side pe bhejne ke liye, jise client apne local storage me store kar sakta hai aur har request ke sath bhej sakta hai authentication ke liye.

userSchema.methods.generateRefreshToken = function () { 
    const payload = {
        userId : this._id,
        email : this.email,
        username : this.username,
    }
    return jsonwebtoken.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : process.env.REFRESH_TOKEN_EXPIRES_IN}
    )
} // jo bhi user ye function call karega, uske liye ek refresh token generate hoga jisme userId, email aur username hoga, aur wo token 7 days ke liye valid hoga.


export const User = mongoose.model("User",userSchema) 