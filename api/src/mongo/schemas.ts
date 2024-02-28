import mongoose from "mongoose";

// create mongoose models for users and projects

// create a user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  description: { type: String },
  githubUrl: { type: String },
  linkedinUrl: { type: String },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

// create a project schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  liveSiteUrl: { type: String, required: true },
  githubUrl: { type: String, required: true },
  category: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// export these schemas
export const User = mongoose.model("User", userSchema);
export const Project = mongoose.model("Project", projectSchema);
