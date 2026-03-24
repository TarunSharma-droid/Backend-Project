//               NOTES 
This main folder include the :--->

1. Backend project setup
2. Database connection
3. 

// 1  use --> New-Item app.js, constants.js, index.js --> shortcut to create multiple file in windows laptop's folder using terminal.
//    use --> mkdir controllers , dataBaseConnection , middlewares, models, routes, utils 
//    to make the folders using the terminal

// 2  use --> touch app.js, constants.js, index.js --> shortcut to create multiple file in mac's laptop using terminal


// 3 We have changed "type": "module"--> from "commonjs"

// 4 package.json file  -->	  Lists the packages your project uses
//   package-lock.json --->   Stores the exact installed versions

// 5 "dev-dependense" are the dependies which are only used during the development and will not go in the production
//   but normal/main "dependense" also go in the production.
 
// 6 Nodemon is online available utility used to restart the server as soon as we save any file.
//   we usually use Nodemon as 'dev-dependense"
//   if we do --> npm i nodemon --> becomes main dependense
//   if we do --> npm i --save-dev nodemon OR npm i -D nodemon --> becomes dev-dependense
// we use nodemon to restart the server automatically as soon as we make any change in the code , so that the changes are 
// also visible. If we dont use the nodemon then changes will not be visible untill and unless we stop the server manually and
// restart it.

// 7. "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "dev": "nodemon src/index.js"
//   }

// Here we have created a "dev" command.
// When we run `npm run dev`, it restarts the server and executes the file `index.js`
// present inside the `src` folder.



// 9. Prettier is the tool/extension
//    It is used to enforce a consistent style across a codebase
//    It is also a dependense
//    To install it in project use --> npm i -D prettier
//    After installing prettier we have to manually create some file in src folder namely .prettierrc  and .prettierignore

// 10. MongoDB atlas is an online service of the mongo where they provide the database online through website.

// 11. While setting up MongoDB Atlas, avoid using 0.0.0.0/0 in the IP whitelist
// because it allows access to the database from any IP address.

// ---> to create database open mongoDB atlas
// Create Database
// Set IP address
// Go to Database Clusters --> Connect (through compass) --> Copy the string given ( replace "password" written in string with actual password of the database)

// ---> to connect to database 
// open VScode 
// setup the project
// go in the .env file declare port variable and mongodn_url varaible and paste the database link .
// make a function in the index file


// 12. intall dotenv to use environment variables
//     npm i dotenv --save
//     

// 13. install mongoose to make connection to database
//     npm i mongoose
//     import mongoose

// 14. install Express to establish client-server relationship
//     npm i express
//     import express


// 15. Working of try and catch

//        try block run hota hai
//               ↓ 
//        agar koi error nahi ayi
//               ↓
//        catch block skip ho jata hai
//               ↓
//        agar error ayi
//               ↓
//        execution turant try se nikal kar catch me chala jata hai


// 16. "dev": "nodemon  src/index.js" this is present in the json file 
// --> this says  runs your file once. If you change something → you have to manually stop and restart.

// "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
// --> nodemone will automatticaly restart.


// 17. require an .env file to store the environment variables

// 18. to connect database to the project we need some environment variables.
//     such as : PORT , MONGODB_URL

// 19.  do not give spaces in link ( i.e.  MONGODB_URL = link  --> invalid) 
 
// 20. if we make any changes in the environment varaible tab to hame server mannualy restart he karna padega yaha nodemon kaam nhi ayega.


// In backend apps we usually follow this pattern:

//           Start application
//                  ↓
//           Connect Database
//                  ↓
//         If DB connected → Start Server
//                  ↓
//         Server starts listening

// If database connection fails, the code jumps to catch and server will not start. Which is good, because: Server without DB = useless 

// npm i cookie parser --> to install cookie parser package
// npm i cors --> to install cors package.


//--------------------------------------- MIDDLEWARE -----------------------------------------------------------

Middleware ko samajhne ke liye ek simple real-life analogy lete hain. Soch tu airport par travel karne gaya hai. Jab tu airport ke andar enter karta hai, tu seedha plane me nahi baith sakta. Beech me multiple steps hote hain—jaise security check, baggage scan, ID verification, boarding pass check, etc. Ye sab processes actually middleware jaise kaam karte hain. Tu (client) request bhejta hai, airport system (server) tak pahunchne se pehle ye saare checks hote hain. Har step decide karta hai ki tujhe aage jaane dena hai ya nahi. Agar sab sahi hai to tu next step pe badhta hai (yehi `next()` hai), warna wahi rok diya jata hai.
Isi tarah web applications me middleware ek function hota hai jo request aur response ke beech me kaam karta hai. Jab client server ko request bhejta hai, to wo directly final route tak nahi pahunchti. Pehle middleware us request ko check karta hai—jaise user authenticated hai ya nahi, data sahi format me hai ya nahi, cookies ya headers read karna, logging karna, etc. Agar middleware satisfy ho jata hai to wo request ko aage bhej deta hai (using `next()`), aur agar nahi to wahi response de deta hai aur aage process ruk jata hai. Simple words me, middleware ek checkpoint ya filter system hai jo ensure karta hai ki sirf valid aur properly processed requests hi final route tak pahunchti hain.



//------------------------------------------- CORS ----------------------------------------------------------

CORS (Cross-Origin Resource Sharing) ek browser security mechanism hai jo control karta hai ki kaunsi website (origin) kisi dusri website ke backend resources ko access kar sakti hai. Browser by default same-origin policy follow karta hai, jiska matlab hai ki ek website sirf apne hi domain, port, aur protocol ke backend se interact kar sakti hai. Agar frontend aur backend alag-alag origin par hote hain (jaise frontend http://localhost:3000 aur backend http://localhost:8000), to browser request ko block kar deta hai aur CORS policy error deta hai.

Is problem ko solve karne ke liye backend me CORS middleware use kiya jata hai, jo explicitly batata hai ki kaunsa frontend allowed hai. Jaise app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true })) me origin define karta hai ki kaunsa frontend request bhej sakta hai, aur credentials: true cookies aur authentication data bhejne ki permission deta hai. Agar CORS properly configure na kiya jaye, to frontend backend APIs ko call nahi kar paayega, login/signup system fail ho sakta hai, aur cookies ya authentication-based features kaam nahi karenge.

//------------------------------------------ COOKIE -------------------------------------------------------

Cookie ko samajhne ke liye ek simple real-life analogy lete hain. Soch tu ek office building me ja raha hai. Jab tu pehli baar jaata hai, guard tujhe verify karta hai aur tujhe ek **ID card** de deta hai. Ye ID card hi cookie hai. Ab har baar jab tu office me enter karega, tujhe dobara verification ki zarurat nahi hoti—tu bas apna ID card dikhata hai aur guard tujhe andar aane deta hai. Isi tarah, jab user kisi website par login karta hai, server uske browser me ek chhota sa data store kar deta hai (jaise token), jise cookie kehte hain. Phir jab bhi user wapas request bhejta hai, browser automatically wo cookie server ko bhejta hai, jisse server user ko pehchaan leta hai bina baar-baar login karwaye.

Ab problem ye hoti hai ki jab ye cookie server ke paas wapas aati hai, to wo ek raw string format me hoti hai, jise directly samajhna thoda mushkil hota hai. Yahin cookie-parser ka role aata hai. Agar hum same analogy use karein, to cookie-parser us guard ke paas ek machine jaisa hai jo ID card ko scan karke clearly details dikha deta hai—naam, ID number, etc. Isi tarah, cookie-parser incoming request ki cookies ko parse karke unhe ek simple object me convert kar deta hai (jaise `req.cookies`), jisse server easily unhe read aur use kar sakta hai. In short, cookie user ki identity store karti hai aur cookie-parser us identity ko read karne ka tool hai.


// --------------------------------------------------------------------------------------------------------

// npm i mongoose-aggregate-paginate-v2 
// it is a package used for pagination. --> used in the video module.

//---------------------------------------- BCRYPT ---------------------------------------------------------
// npm i bcrypt 
// it help to hash the password
Purpose:---> Passwords ko securely store karne ke liye use hota hai
Why needed: --->
Agar tum plain text password database me store karoge → security risk
Hackers easily access kar sakte hain

Kaise kaam karta hai:---->
bcrypt.hash(password, saltRounds) → password ko hashed form me convert karta hai
Hash irreversible hota hai → original password wapas nahi nikala ja sakta
Login ke time bcrypt.compare(inputPassword, hashedPassword) → check karta hai ki input correct hai ya nahi


// --------------------------------------- TOKENS -----------------------------------------------------------

// npm i jsonwebtoken
What are tokens?
Tokens ek secureoibject hote hain jo server aur client ke beech user authorization ke liye use hote hain.
Basically: “proof that the user is logged in”
JWT (JSON Web Token) is the most common type of token.

Use case:

User login karta hai → server access token generate karta hai
Client ye token har protected API call ke saath bhejta hai
Server token verify karta hai → agar valid hai → access allow

1️⃣Login Phase -->
User login karta hai (email/password ya kisi aur auth method se).
Server verify karta hai credentials.
Agar credentials correct hain → server access token (JWT) generate karta hai.
Server ye access token client ko bhejta hai → usually response body ya HTTP-only cookie me.
Server refresh token bhi generate karke client ko deta hai → long-term authentication ke liye.

2️⃣ Client Request with Access Token -->
Client har protected API request me access token bhejta hai → usually Authorization: Bearer <token> header me.
Server access token verify karta hai:
Agar valid → request process hoti hai.
Agar invalid ya expired → server 401 Unauthorized response bhejta hai.

3️⃣ Access Token Expiry -->
Access token short-lived hota hai (example: 1 day).
Agar client expired access token ke saath request bhejta hai → server token invalid consider karta hai.
Client refresh token ka use karke naya access token request karta hai.

4️⃣ Refresh Token Flow -->
Client ke paas refresh token hota hai (longer-lived, example: 7 days).
Access token expire hone par client refresh token server ko bhejta hai.
Server refresh token verify karta hai:
Valid hai ya nahi
Token tampered ya revoked to nahi
Agar refresh token valid hai → server naya access token generate karta hai.
Server naya token client ko bhejta hai → client fir se naya access token ke saath protected API requests kar sakta hai.

// ---------------------------------------------------------------------------------------------------------------