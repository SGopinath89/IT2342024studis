import mongoose, { Schema } from 'mongoose';

const courseSchema = new Schema({
    courseCode: { type: String, required: true },
    title: { type: String, required: true },
    lectureInCharge: { type: String, required: true },
    duration: { type: String, required: true },
    courseContent: { type: String, required: true },
    isTrashed: { type:Boolean, default: false },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
