import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    regNumber: { type: String, required: true },
    degree: { type: String },
    contact: { type: String, },
    birthday: { type: Date, },
    academicBatch: { type: String, },
    profilePic: { type: String, },
    isAdmin: { type: Boolean, required: true, default: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    isActive: { type: Boolean, required: true, default: false },
    timetable: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
},
{ timestamps: true}
);

userSchema.pre("save", async function (next){
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;