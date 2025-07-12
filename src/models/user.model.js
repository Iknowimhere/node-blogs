import mongoose from "mongoose";
import bcrypt from "bcryptjs";

let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      minLength: [4, "username minimum character length is 4"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: function (value) {
          return String(value)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        },
        message:"Enter proper email"
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [6, "password minimum character length is 6"],
    },
    confirmPassword: {
      type: String,
      required: [true, "confirm password is required"],
      minLength: [6, "confrim password minimum character length is 6"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "password and confirm password do not match",
      },
    },
  },
  {
    timestamps: true,
  }
);

//mongoose hook--pre middleware 
userSchema.pre("save",async function(next){
    this.password=await bcrypt.hash(this.password,10)
    this.confirmPassword=undefined;
    next()
})


let User = mongoose.model("User", userSchema);

export default User;
