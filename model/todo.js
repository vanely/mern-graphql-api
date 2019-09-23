const mongoose = require('mongoose');

const {Schema} = mongoose;

const Todo = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        complete: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Todo', Todo);