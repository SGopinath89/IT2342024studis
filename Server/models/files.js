import mongoose, { Schema } from 'mongoose';

const fileSchema = new Schema({
    fileName: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
    file: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isTrashed: { type:Boolean, default: false },
});

const File = mongoose.model("File", fileSchema); 

export default File;
