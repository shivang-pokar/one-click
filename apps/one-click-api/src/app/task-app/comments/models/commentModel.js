const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define the Comment schema
const commentSchema = new Schema({
    company_id: { type: String, required: true },
    project_id: { type: String, required: true },
    task_id: { type: String, required: true },
    comment: { type: String, required: true },
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedBy: { type: String },
    updatedAt: { type: Date, default: Date.now },
    deleteFlag: { type: String, default: "N" },
    id: { type: String, required: true }
}, { collection: 'comment' });

// Create the model
const Comment = model('Comment', commentSchema);

module.exports = Comment;
