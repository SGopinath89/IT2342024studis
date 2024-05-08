import mongoose, { Schema } from 'mongoose';

const noticeSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String },
    task: { type: Schema.Types.ObjectId, ref: "Task" },
    notiType: { type: String, default: "alert", enum: ["alert", "message"] },
    isRead: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
},
{ timestamps: true }
);

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;