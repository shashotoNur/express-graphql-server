const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coderSchema = new Schema(
    {
        name: String,
        level: Number,
        projectId: Array
    });

module.exports = mongoose.model('Coder', coderSchema);