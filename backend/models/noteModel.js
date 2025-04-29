import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/noteApp")

const notesSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    isImportant: Boolean,
    uploadedBy: String,
    date: {
        type: Date,
        default: Date.now
    }
})

const notesModel = mongoose.model("Notes", notesSchema)

export default notesModel