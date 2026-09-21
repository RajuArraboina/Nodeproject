const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, 'Token is required'],
      unique: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: '30d', // Atomatically purge documents after 30 daysu
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model('TokenBlacklist', tokenBlacklistSchema);
