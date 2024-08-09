// userModel.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const labelSchema = new mongoose.Schema({
    id: { type: String, required: true },
    company_id: { type: String, required: true },
    background: { type: Object, required: true },
    labelName: { type: String, required: true },
    createdBy: { type: String },
    createdAt: { type: String },
    updatedBy: { type: String },
    updatedAt: { type: String },
    deleteFlag: { type: String, required: true },
}, { collection: 'label' });

const Label = mongoose.model('label', labelSchema);

export default Label;
