import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, "Email can't be empty"],
    match: [
      /^(?=.{8,20}$)(?![.])(?!.*[.]{2})[a-zA-Z0-9.çğıÇĞİ]+(?<![.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  }
})

const User = models.User || model("User", UserSchema);
export default User;