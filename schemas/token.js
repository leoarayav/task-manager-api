const { Schema, model } = require('mongoose');

const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    expiration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

module.exports = model('Token', tokenSchema);
