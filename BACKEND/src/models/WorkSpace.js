
// src/models/Workspace.js
import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    projects: [
      {
        title: String,
        description: String,
        createdAt: { type: Date, default: Date.now },
        // add more project fields as needed
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Workspace', workspaceSchema);
