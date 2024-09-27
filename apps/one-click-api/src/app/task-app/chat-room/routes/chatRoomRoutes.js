const express = require('express');
const { createChatGroup, updateChatGroup, getChatGroupByProject, createMessage, getMessagesByGroupId, } = require('../controllers/chatRoomControllers');
const router = express.Router();

// Route to create a comment
router.post('/chat', createChatGroup);

// Route to update a comment by ID
router.put('/chat/:id', updateChatGroup);

// Route to get comments by task_id
router.get('/chat/room/:project_id', getChatGroupByProject);

router.post('/chat-messages', createMessage);

router.get('/chat-messages/by-room/:room_id', getMessagesByGroupId);

module.exports = router;