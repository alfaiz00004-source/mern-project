const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // bcrypt import karna important hai

// User schema definition
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

// Password hashing before saving (async/await version)
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return; // agar password modify nahi hua, skip
  const salt = await bcrypt.genSalt(10);   // salt generate
  this.password = await bcrypt.hash(this.password, salt); // password hash
});

// Custom method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the model
module.exports = mongoose.model('User', userSchema);
