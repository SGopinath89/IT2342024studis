import mongoose, { Schema } from 'mongoose';

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    startTime: { type: Date, required: true }, 
    endTime: { type: Date, required: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isTrashed: { type:Boolean, default: false },
});

const Event = mongoose.model('Event', eventSchema);
 
export default Event;
 