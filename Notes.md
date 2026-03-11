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