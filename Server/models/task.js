import mongoose, { Schema } from 'mongoose';


const taskSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    priority: { type: String, default: "normal", enum: ["high", "medium", "normal", "low"] },
    stage: { type: String, default: "todo", enum: ["todo", "in progress", "completed"] },
    subTasks: [
        {
            title: String,
            date: Date,
        },
    ],
    activities: [
        {
          type: {
            type: String,
            default: "assigned",
            enum: [
              "assigned",
              "started",
              "in progress",
              "bug",
              "completed",
              "commented",
            ],
          },
          activity: String,
          date: { type: Date, default: new Date() },
          by: { type: Schema.Types.ObjectId, ref: "User" },
        },
      ],
    assets:[String],
    isTrashed: { type:Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
},
{ timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;