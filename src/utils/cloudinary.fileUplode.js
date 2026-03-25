
import {v2} from cloudinary // v2 is the latest version of cloudinary : we  are using the latest version of the cloudinary library to interact with the Cloudinary service.
import fs from 'fs' 
// Node.js ka built-in module hai --> so no need to install it separatey using npm.
// fs module ka use file system ke operations ke liye hota hai, jaise ki file read karna, delete karna, etc.
// Later use hoga jab hum local file upload karke delete karenge.


// File pehle Multer ke through server ke local storage me save hoti hai, fir waha se Cloudinary pe upload hoti hai.
// After successful or non successful upload, // local file ko delete karna zaruri ho jata hai, warna local storage me unnecessary files accumulate ho jayengi, jo ki storage space waste karega.
// Isliye fs module ka use karke hum local file ko delete karte hain after successful upload to Cloudinary.


cloudinary.config({  // 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// Setting up the Cloudinary --> here we are setting the credentials for Cloudinary. These credentials will be used when user interacts with the Cloudinary service to perform operations like uploading files, deleting files, etc.
// Jab hum Cloudinary ko request bhejte hain, tab ye credentials use hote hain ye batane ke liye ki kis account me 
// operation (upload, delete, etc.) karna hai


const uploadOnCloudinary = async (localFilePath) => {
    try {

        if (localFilePath) {

            const response = await cloudinary.uploader.upload(
                localFilePath,
                { resource_type: "auto" } // resource_type: "auto" ka matlab hai ki Cloudinary automatically file type ko detect kar lega, chahe wo image ho, video ho, ya koi aur file type ho. Isse hum alag-alag file types ke liye alag-alag upload functions use karne ki zarurat nahi padti.
            )
            // file uplode hogi or fir Cloudinary file ka URL , public_id, etc. return karega jo ki response variable me store ho jayega.
            console.log("File uploaded successfully",response.url);

            fs.unlinkSync(localFilePath)
            return response  // response ko vaha return kr denge jaha ye function call hua hai by the user.

        } else {
            // 🔹 Custom Error
            throw new ApiError(400, "File path is required")  // to the catch block.
        }

    } 
    catch (error) {  // Catch tab chalega jab bhi error throw hoga -->(chahe system error ho ya custom error)

        console.log("Cloudinary upload error:", error.message)

        fs.unlinkSync(localFilePath) 

        if (error instanceof ApiError) {
            // Custom error → already correct
            throw error
        } else {
            // System error → convert to ApiError
            throw new ApiError(500, error.message || "Internal Server Error") // jaha se function call hua hai waha error ko handle karne ke liye throw kar rahe hain.
        }
    }
}

export { uploadOnCloudinary } // export kar rahe hain taaki jaha bhi is function ki zarurat ho waha import karke use kar sakein.


// Flow of the function :

// 🔹 Case 1: File path present hai

// if (localFilePath) true hoga
// Cloudinary upload try hoga
// --> Agar upload success:
// response milega
// return response → function successful 
// --> Agar upload fail:
// error aayega
// Control catch me chala jayega 

// 🔹 Case 2: File path nahi hai

// if false hoga → else chalega
// throw new ApiError(...) execute hoga 
// Direct error generate hoga
// Control catch me chala jayega
