import mongoose from "mongoose";
import router from "../routes/index.js";

mongoose.connect("mongodb://127.0.0.1:27017/noteApp")

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)

export default User
