const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const chatRoomsSchema = new Schema({
    id: { type: String, required: true },
    company_id: { type: String, required: true },
    project_id: { type: String, required: true },
    is_group: { type: Boolean },
    members: [
        {
            user_id: { type: String, required: true },
            joined_at: { type: Date, required: true }
        }
    ],
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now },
    room_name: { type: String },
    last_message: { type: Object },
    deleteFlag: { type: String, default: "N" }
}, { collection: 'chatRoom' });

export const ChatRooms = model('ChatRooms', chatRoomsSchema);


const messageCollectionSchema = new Schema({
    id: { type: String, required: true },
    room_id: { type: String, required: true },
    sender_id: { type: String, required: true },
    content: { type: String },
    media_url: { type: String },
    sent_at: { type: Date, default: Date.now },
    read_by: [
        {
            user_id: { type: String, required: true },
            read_at: { type: Date, required: true }
        }
    ],
    deleteFlag: { type: String, default: "N" }
}, { collection: 'chatMessages' })

export const MessageCollection = model('MessageCollection', messageCollectionSchema);