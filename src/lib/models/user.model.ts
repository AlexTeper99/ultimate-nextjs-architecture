import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    autoincrement: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
});

export type UserType = InferSchemaType<typeof userSchema>;

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
