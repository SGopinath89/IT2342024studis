import mongoose, { Schema } from 'mongoose';

const fileSchema = new Schema({
    fileName: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who uploaded the file
    file: { type: String, required: true } // Store file ID or filename
});

const File = mongoose.model("File", fileSchema);

export default File;
