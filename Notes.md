//               NOTES

// 1 New-Item app.js, constants.js, index.js --> shortcut to create multiple file in windows folder using terminal

// 2 touch app.js, constants.js, index.js --> shortcut to create multiple file in mac folder using terminal

// 3 "type": "module", --> we can also make it "commonjs"

// 4 package.json  -->	    Lists the packages your project uses
//   package-lock.json --->   Stores the exact installed versions

// 5 Nodemon is online available utility used to restart the server as soon as we save any file.
//   we usually use Nodemon as 'dev-dependense"

// 6 "dev-dependense" are the dependies which are only used during the development and will not go in the production
//   but normal/main "dependense" also go in the production.

//   if we do --> npm i nodemon --> becomes main dependense
//   if we do --> npm i --save-dev nodemon OR npm i -D nodemon --> becomes dev-dependense



// 7 "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "dev" : "nodemon src/index.js"
    },
//  here we have created a "dev" command. which will activate the nodemon and run the index.js file present inside src folder

// 8  use -->  mkdir controllers , dataBaseConnection , middlewares, models, routes, utils 
//    to make the folders using the terminal

// 9. Prettier is the tool/extension
//    It is used to enforce a consistent style across a codebase
//    It is also a dependense
//    To install it in project use --> npm i -D prettier
//    After installing prettier we have to manually create some file in src folder namely .prettierrc 

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


// 16. "dev": "node src/index.js" this is present in the json file 
// --> this says  runs your file once. If you change something → you have to manually stop and restart.

// "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
// --> nodemone will automatticaly restart.


// 17. require an .env file to store the environment variables

// 18. to connect database to the project we need some environment variables.
//     such as : PORT , MONGODB_URL

// 19.  do not give spaces in link ( i.e.  MONGODB_URL = link  --> invalid) 
 
// 20. if we make any changes in the environment varaible tab to hame mannualy restart he karna padega yaha nodemon kaam nhi ayega.