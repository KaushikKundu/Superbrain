import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL as string;
export const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); 
    }
};

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    }
});
const contentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    link:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,

    },
    tags:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
       
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
})
export const ContentModel = mongoose.model("Content", contentSchema);
export const UserModel = mongoose.model("User", userSchema);

