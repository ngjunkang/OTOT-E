import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  ip_address: String,
  gender: String,
  email: String,
  first_name: String,
  last_name: String,
  school: String,
});

const StudentModel = mongoose.model("student", StudentSchema);

export { StudentModel };
