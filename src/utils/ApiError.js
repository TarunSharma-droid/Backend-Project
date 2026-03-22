class ApiError extends Error { 
    constructor(statusCode, message = "Something went wrong", errors = []) {

        super(message); // parent Error class ko call kar rahe hain

        this.statusCode = statusCode; // HTTP error code (400, 404, 500, etc.)

        this.success = false; // error me success hamesha false hota hai

        this.errors = errors; // extra error details (optional)

    }

}

export { ApiError };

// ## 🔹 ApiError – Standardizing Error Handling in Backend

// In backend development, handling errors properly is just as important as sending successful responses.
// By default, when an error occurs in JavaScript (for example, using `throw new Error("User not found")`),
// it only contains a message and lacks important details such as HTTP status codes or structured information. 
// This creates inconsistency in error responses, making it difficult for the frontend to understand what went
// wrong and how to handle it. Different routes may also send errors in different formats, leading to poor
// maintainability and debugging challenges.
// To solve this problem, developers create a custom error class, commonly named `ApiError`, which extends the
// built-in `Error` class. 

// Agar hum aise error throw karein:

// throw {
//   statusCode: 404,
//   message: "User not found"
// }

// To ye real error nahi hai, kyunki:
// - Ye sirf ek plain JavaScript object hai
// - Ye `Error` class ka instance nahi hai
// - Isme stack trace aur built-in error features nahi hote
// - JavaScript aur Express isse proper error ki tarah treat nahi karte


// Sahi Approach -->
// JavaScript me real error wo hota hai jo `Error` class ka instance hota hai.
// Isliye hum apni custom error class (`ApiError`) ko `Error` se extend karte hain

// For example --> when we hit "/check-age" then
// Internally kya bana:

// {
//   statusCode: 400,             → tumne diya 
//   success: false,              → ApiError class ne set kiya
//   message: "You are underage", → tumne diya
//   errors: [],
//   stack: "Error: You are underage at /check-age..." → Error class ne diya (SYSTEM POWER) (ye batata hai kis line ki vajah se error ayi)
// }

 
