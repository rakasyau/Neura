import mongoose, { Schema, Document, Model } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  passwordHash: string
  xp: number
  completedChapters: string[]
  completedQuizzes: Record<string, number>
  badges: string[]
  createdAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Nama wajib diisi"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
    },
    xp: {
      type: Number,
      default: 0,
    },
    completedChapters: {
      type: [String],
      default: [],
    },
    completedQuizzes: {
      type: Map,
      of: Number,
      default: {},
    },
    badges: {
      type: [String],
      default: ["ML Learner"],
    },
  },
  {
    timestamps: true,
  }
)

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
