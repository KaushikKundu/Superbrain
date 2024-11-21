import mongoose from "mongoose";

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
    name:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 10,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 10
    }
});

export default mongoose.model("User", userSchema);

