const mongoose = require('mongoose');

const {Schema} = mongoose;

const Todo = new Schema(
    {
        text: {type: String},
        complete: {type: Boolean},
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Todo', Todo);