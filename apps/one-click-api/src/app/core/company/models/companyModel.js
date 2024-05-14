// userModel.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const companySchema = new mongoose.Schema({
    id: { type: String, required: true },
    company_name: { type: String, required: true },
    timeZone: { type: String, required: true },
    createdBy: { type: String },
    updatedBy: { type: String },
    deleteFlag: { type: String },
    masterId: { type: String, required: true },
    status: { type: String },
    stripe_customer_id: { type: String },
    stripe_subscription_id: { type: String },
    stripe_created: { type: Number },
    stripe_expires_at: { type: Number },
    labels: { type: Array, default: [] }
}, { collection: 'company' });

const Company = mongoose.model('Company', companySchema);

export default Company;
