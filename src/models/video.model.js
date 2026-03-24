
import mongoose from 'mongoose'
import {Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'  

const videoSchema = new Schema (

    {
        videoFile :{
            type : String, // cloudinary URL
            required : true,
        },

        thumbnail : {
            type : String,
            required : true
        },
        title : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        duration : {
            type : Number, // from cloudinary 
            required : true
        },
        views : {
            type : Number,
            default : 0,
        },
        isPublished : {
            type : Boolean,
            default : true
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    },
    { timestamp : true}
) 

videoSchema.plugin(mongooseAggregatePaginate)

// 🔹 Plugin = ready-made feature jo schema ko extra functionality deta hai
// 🔹 Yaha use → pagination add karne ke liye

// 🔹 Pagination = data ko chhote parts (pages) me divide karna
// Ek baar me saara data load nahi hota, sirf limited items show hote hain

// 🔹 Kaise kaam karta hai:
// page → kaunsa page chahiye (1, 2, 3...)
// limit → har page me kitne items (e.g. 10 videos)

// 🔹 Example:
// page = 1, limit = 10 → first 10 videos
// page = 2, limit = 10 → next 10 videos

// 🔹 Benefits:
// ✔ Fast loading (sirf required data aata hai)
// ✔ Server load kam hota hai
// ✔ Smooth user experience (scroll / next page)

// 🔹 Without plugin → skip, limit manually likhna padta
// 🔹 With plugin → easy aur clean pagination mil jata hai


export const Video = mongoose.model("Video",videoSchema)