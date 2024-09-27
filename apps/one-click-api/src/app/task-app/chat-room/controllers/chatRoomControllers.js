import { ChatRooms, MessageCollection } from '../models/chatRoomModel';

export const createChatGroup = async (req, res) => {
    try {
        const chatRooms = await ChatRooms.create(req.body);
        res.status(200).json({ message: 'Group created successfully', chatRooms });
    }
    catch (e) {
        res.status(500).json({ error: 'Failed to create group' });
    }
}

export const updateChatGroup = async (req, res) => {
    try {

        const { id } = req.params;
        const query = { id: id };
        delete req.body.__v
        delete req.body._id

        const update = { $set: { ...req.body } };
        const options = { new: true, runValidators: true };

        const chatGroup = await ChatRooms.findOneAndUpdate(query, update, options);

        if (!chatGroup) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Return success response with the updated comment
        res.status(200).json({ message: 'Group updated successfully', chatGroup });

    }
    catch (e) {
        res.status(500).json({ error: 'Failed to create group' });
    }
}

export const getChatGroupByProject = async (req, res) => {

    try {
        const { project_id } = req.params;
        const chatRooms = await ChatRooms.find({ project_id, deleteFlag: 'N' });

        if (chatRooms.length === 0) {
            res.status(201).json([]);
        } else {
            res.status(200).json(chatRooms);
        }
    } catch (err) {
        res.status(500).json({ message: 'Error fetching comments', error: err });
    }
}

export const createMessage = async (req, res) => {
    try {
        const messageCollection = await MessageCollection.create(req.body);
        res.status(200).json({ message: 'Message created successfully', messageCollection });
    }
    catch (e) {
        res.status(500).json({ error: 'Failed to create message' });
    }
}

export const getMessagesByGroupId = async (req, res) => {

    try {
        const { room_id } = req.params;
        const messages = await ChatRooms.find({ room_id, deleteFlag: 'N' });

        if (messages.length === 0) {
            res.status(201).json([]);
        } else {
            res.status(200).json(messages);
        }
    }
    catch (e) {
        res.status(500).json({ error: 'Failed to get message' });
    }
}