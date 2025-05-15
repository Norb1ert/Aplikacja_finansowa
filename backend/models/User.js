const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

// Pole do połąćzenia z transakcjami
userSchema.virtual('transactions', {
  ref: 'Transaction',
  localField: '_id',
  foreignField: 'userId'
});

// Include virtuals when converting to JSON or object
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
