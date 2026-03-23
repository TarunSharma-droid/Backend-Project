// When we define the content for various routes, so har route mai error aa skti hai to har route  ke liye try catch block 
// likhna padega error handel krne ke liye, matlb har route ke liye error handling karni padegi, toh ye bohot tedious ho jayega. 
// So to solve this problem of writting the same piece of code again and again , we can create a function which will take the  
// different route handler function as an argument , perform the error handling and then return a new function which will be 
// used as the route handler.

// AsyncHandler ka kaam -->
// Route ke async function me agar error aaye → catch karna
// System error ya custom error dono ko ek hi format me convert karna
// Response send karna JSON format me, taaki frontend predictable way me handle kar sake.

const asyncHandler = (func) => { // takes the route handler function as an argument, which is the function for which we want to perform error handling.

    // ye ek naya middleware function return karega
    return async (req, res, next) => {
 
        try {
            await func(req, res, next);  

        } 
        catch (error) { //catch(error) route ke andar throw hone wali har error ko pakadta hai, chahe wo custom error ho ya system error.
        
// if block checks ki jo error aayi hai kya vo ApiError class ko follow krti hai ya nhi --> agar error ApiError ka instance nahi hai, matlab ye system error hai ya developer ne custom format follow nahi kiya error define krte samay.
           
            if (error instanceof ApiError) {  
                // custom error → already defined correctly by the developer so no need to change anything in its format.
                new_error = error
            } 
            else {
               // system error or custom error in wrong format → convert to ApiError
               new_error = new ApiError(500, error.message || "Internal Server Error")
            }

            // ab sabka format same
            res.status(new_error.statusCode) // agar error ApiError ka instance hai to uska statusCode use karo, warna 500 (Internal Server Error) set karo
            .json({
                success: new_error.success,
                message: new_error.message,
                errors: new_error.errors
            })
       }

    };

};

export {asyncHandler} 