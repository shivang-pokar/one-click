// userModel.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskGroupSchema = new Schema({
    id: { type: String, required: true },
    company_id: { type: String, required: true },
    project_id: { type: String, required: true },
    groupName: { type: String },
    isOpen: { type: Boolean },
    status: { type: String },
    createdBy: { type: String },
    createdAt: { type: String },
    updatedBy: { type: String },
    updatedAt: { type: String },
    deleteFlag: { type: String },
}, { collection: 'taskGroup' });

const TaskGroup = model('TaskGroup', taskGroupSchema);

export default TaskGroup;
