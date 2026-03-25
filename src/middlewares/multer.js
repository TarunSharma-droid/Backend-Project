//Multer ek middleware hai jo: user se aayi file ko receive karke server pe save karta hai

import multer from 'multer' 

// ya to request ayegi ya file ategi from the client.
//  Storage setup (file kaha aur kaise save hogi)

const storage = multer.diskStorage({  // diskStorage is a function of multert which tells multer ki file ko local disk pe save karna hai.

    destination: (req, file, cb) => { // File kaha save hogi (location) --> destination ka matlb hai multer.diskStorage ke andar wali destination.
        cb(null, "./public/temp")  // file yaha save hogi -> ye jo temp file hai ye bhi server ki storage ka he hissa hai.
    }, // cb is the callback function -->  jiske through multer se communication krte hain.

    // cb(error, answer) --> this is the syntax of the callback function. Agar error hai to pehle argument me error pass karte hain, agar error nahi hai to pehle argument me null pass karte hain, aur dusre argument me answer pass karte hain.
    filename: (req, file, cb) => { // File ka naam kya hoga
        cb(null, Date.now() + "-" + file.originalname) 
        // unique naam de diya
    }
})

//  Multer instance ---> have to make it compulsory.
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // max 5MB
    }
})
// storage: storage — matlab woh configuration jo upar `multer.diskStorage` se banaya tha, woh yahan pass kar rahe hain ki file kahan aur kaise save hogi.
// limits — iska matlab hai file pe restrictions lagana. --> fileSize: 5 * 1024 * 1024 — matlab 5MB se badi file allowed nahi hogi.

export { upload }