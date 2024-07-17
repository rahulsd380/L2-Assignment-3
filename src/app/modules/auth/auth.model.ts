import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { TUser, UserModel } from "./auth.interface";

const userSchema: Schema = new Schema<TUser, UserModel>(
  {
    _id : {type: String},
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: { type: String, required: true },
    password: { type: String, required: true},
    phone: { type: Number },
    address: { type: String },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password as string,
    Number(config.bcrypt_salt_round)
  );
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExists= async function (email: string){
  return await User.findOne({email})
}

userSchema.statics.isPasswordMatched= async function (plainTextPassword, hashedPassword){
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}

export const User = model<TUser, UserModel>("User", userSchema);
