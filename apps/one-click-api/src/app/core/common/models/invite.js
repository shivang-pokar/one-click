// models/Invite.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const inviteSchema = new Schema({
    email: { type: String, required: true, unique: true, },
    invitedBy: { type: String, required: true, },
    company_id: { type: String, required: true, },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending', },
    inviteToken: { type: String, required: true, },
    createdAt: { type: Date, default: Date.now },
});

const Invite = mongoose.model('Invite', inviteSchema);

export default Invite;