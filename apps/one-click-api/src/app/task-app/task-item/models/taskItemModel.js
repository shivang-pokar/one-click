// userModel.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskItemSchema = new Schema({
    id: { type: String, required: true },
    company_id: { type: String, required: true },
    project_id: { type: String, required: true },
    description: { type: String },
    taskName: { type: String },
    group_id: { type: String },
    status: { type: String },
    assignee: { type: Array },
    due: { type: String },
    priority: { type: String },
    summary: { type: String },
    label: { type: Array },
    taskType: { type: String },
    icon: { type: String },
    completed: { type: Boolean },
    createdBy: { type: String },
    createdAt: { type: String },
    updatedBy: { type: String },
    updatedAt: { type: String },
    deleteFlag: { type: String },
}, { collection: 'taskItem' });

const TaskItem = model('TaskItem', taskItemSchema);

export default TaskItem;
