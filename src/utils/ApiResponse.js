class ApiResponse { // "Main ek template bana raha hoon jisse objects banenge...

    constructor(statusCode, data, message) {

        this.statusCode = statusCode; // HTTP status code (200, 201, etc.)

        // agar statusCode 400 se chota hai to success true hoga
        this.success = statusCode < 400;

        this.message = message; // user-friendly message (frontend ko dikhane ke liye)

        this.data = data; // actual data jo hum bhejna chahte hain (user, product, etc.)
    }

}

export { ApiResponse };

//                         🔹 ApiResponse – Standardizing Server Responses

// In backend development, although the server is always responsible for sending responses, the structure of those responses is decided by the developer. 
// When building multiple routes (such as /user, /product, /order), a common problem arises: each route may return data in a different format. 
// For example, one route might return { name: "Tarun" }, another { success: true, data: product }, and another { message: "done", result: order }. This inconsistency 
// creates confusion for the frontend, increases handling complexity, and makes the codebase harder to maintain and debug.

// To solve this problem, developers define a standard response schema that every route must follow. This is achieved by creating a dedicated class, commonly
// named ApiResponse, which acts as a template for all successful responses sent from the server. Instead of manually structuring responses in every route, 
// the developer simply creates an object of this class and sends it.


