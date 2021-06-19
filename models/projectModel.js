const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        name: String,
        details: String,
        projectIds: Array
    });

module.exports = mongoose.model('Project', projectSchema);