const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        name: String,
        details: String,
        coderIds: Array
    });

module.exports = mongoose.model('Project', projectSchema);