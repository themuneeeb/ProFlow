import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ['admin', 'employee'], default: 'employee' },
    workspaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
  },
  { timestamps: true }
);

// Hash password on save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password helper
userSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

export default mongoose.model('User', userSchema);
