// userModel.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    id: { type: String, required: true },
    company_id: { type: String, required: true },
    url: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: '' },
    uid: { type: String },
    name: { type: String, required: true },
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedBy: { type: String },
    updatedAt: { type: Date, default: Date.now },
    deleteFlag: { type: String }
}, { collection: 'users' });

const User = model('User', userSchema);

export default User;
