import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
        name: String,
        age: Number,
        grade: String
    })
    const student=mongoose.model("students",studentSchema);

export default  student;    