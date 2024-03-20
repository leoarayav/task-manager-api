const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  taskId: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 300,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = model('Comment', commentSchema);
