import mongoose, { Schema } from 'mongoose';

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true }, 
    duration: { type: Number, required: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isTrashed: { type:Boolean, default: false },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
