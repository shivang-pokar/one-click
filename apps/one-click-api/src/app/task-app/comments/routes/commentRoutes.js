const express = require('express');
const { createComment, updateComment, getCommentsByTask, deleteComment } = require('../controllers/commentController');
const router = express.Router();

// Route to create a comment
router.post('/comments', createComment);

// Route to update a comment by ID
router.put('/comments/:id', updateComment);

// Route to get comments by task_id
router.get('/comments/task/:task_id', getCommentsByTask);

router.delete('/comments/:id', deleteComment);

module.exports = router;