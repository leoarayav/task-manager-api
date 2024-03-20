const { Schema, model } = require('mongoose');
const crypter_service = require('../services/crypter.service');

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  address: { type: String },
  role: { type: String, default: 0 }, // 0: user, 1: admin
  verified: { type: Boolean, default: false },
  avatar: { type: String },
});

userSchema.pre('save', async function (next) {
  try {
    const user = this;
    if (!user.isModified('password')) return next();
    user.password = await crypter_service.hash(user.password);
    console.info(`Password hashed for user ${user.email}`);
    next();
  } catch (err) {
    next(err);
  }
});

// this avoid to return password, __v and _id of the user because are not necessary for the client :)
userSchema.set('toJSON', {
  transform(__, ret, _) {
    delete ret.password;
    delete ret.__v;
    delete ret._id;
    return ret;
  },
});

module.exports = model('User', userSchema);
