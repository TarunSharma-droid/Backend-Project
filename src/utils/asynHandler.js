// When we define the content for various routes, so har route mai error aa skti hai to har route  ke liye try catch block 
// likhna padega error handel krne ke liye, matlb har route ke liye error handling karni padegi, toh ye bohot tedious ho jayega. 
// So to solve this problem of writting the same piece of code again and again , we can create a function which will take the  
// different route handler function as an argument , perform the error handling and then return a new function which will be 
// used as the route handler.

// this "func" is the function of any specific route and we want to preform the erroe handling for that function, so we will pass
// this function as an argument to the asyncHandler function and then we will return a new function which will be used as the route handler.


const asyncHandler = (func) => { // takes the route handler function as an argument, which is the function for which we want to perform error handling.

    // ye ek naya middleware function return karega
    return async (req, res, next) => {
 
        try {
            await func(req, res, next);  

        } 
        catch (error) {
        // agar system error hai to convert karo to get all the error in same format.
            if (!(error instanceof ApiError)) { // matlb jo error aayi hai agar vo ApiError ke format ko follow nahi karti hai to vo system error hai, to usko ApiError ke format me convert kar do taki sabka format same ho jaye.
                error = new ApiError(500, error.message || "Internal Server Error")
            }

            // ab sabka format same
            res.status(error.statusCode).json({
                success: error.success,
                message: error.message,
                errors: error.errors
            })
       }

    };

};

export {asyncHandler} 