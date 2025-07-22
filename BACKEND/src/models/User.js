// src/models/User.js
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: {
      type: String,
      required: function() { return !this.googleId },
    },
    googleId: { type: String, unique: true, sparse: true },
    avatarUrl: {
      type: String,
      default: () => '/assets/profile-pictures/default.jpg'
    },
    verified:  { type: Boolean, default: false },
    workspaces:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
  },
  { timestamps: true }
)

// When you create/find a Google user, set avatarUrl to their Google photo:
userSchema.statics.findOrCreateGoogle = async function(profile) {
  let user = await this.findOne({ googleId: profile.id })
  if (!user) {
    user = await this.create({
      googleId: profile.id,
      name:     profile.displayName,
      email:    profile.emails[0].value,
      avatarUrl: profile.photos[0].value,
    })
  }
  return user
}

// Hash password on save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Compare password helper
userSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password)
}

export default mongoose.model('User', userSchema)
