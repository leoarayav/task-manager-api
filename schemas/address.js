const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: {
    type: String,
    required: true,
  },
  phoneno: { type: String, required: true },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    minlength: 5,
    maxlength: 10,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = model('Address', addressSchema);
