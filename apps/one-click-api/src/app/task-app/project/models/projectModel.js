// userModel.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const projectSchema = new Schema({
    id: { type: String, required: true },
    company_id: { type: String, required: true },
    projectName: { type: String, required: true },
    projectDescription: { type: String },
    createdBy: { type: String },
    createdAt: { type: String },
    updatedBy: { type: String },
    updatedAt: { type: String },
    deleteFlag: { type: String },
    label: { type: String },
    lastOpened: { type: String },
    completed: { type: Boolean, default: false },
    trashed: { type: Boolean, default: false },
    isTemplate: { type: Boolean, default: false }
}, { collection: 'project' });

const Company = model('Project', projectSchema);

export default Company;
