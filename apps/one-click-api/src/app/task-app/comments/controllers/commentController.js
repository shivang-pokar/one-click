import Comment from "../models/commentModel";

export const createComment = async (req, res) => {
    try {
        // Create a new comment using the request body
        const comment = await Comment.create(req.body);

        // Return success response with the created comment
        res.status(200).json({ message: 'Comment created successfully', comment });
    } catch (error) {
        console.error('Error creating comment:', error);

        // Return a server error if the comment creation fails
        res.status(500).json({ error: 'Failed to create comment' });
    }
};


export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const query = { id: id };

        delete req.body.__v
        delete req.body._id

        console.log(req.body)

        const update = { $set: { ...req.body } };
        const options = { new: true, runValidators: true };

        console.log(update)
        const comment = await Comment.findOneAndUpdate(query, update, options);
        console.log(comment)

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Return success response with the updated comment
        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (error) {
        console.error('Error updating comment:', error);

        // Return a server error if the update fails
        res.status(500).json({ error: 'Failed to update comment' });
    }
};


export const getCommentsByTask = async (req, res) => {
    try {
        const { task_id } = req.params;
        const comments = await Comment.find({ task_id, deleteFlag: 'N' });

        if (comments.length === 0) {
            res.status(201).json([]);
        } else {
            res.status(200).json(comments);
        }

    } catch (err) {
        res.status(500).json({ message: 'Error fetching comments', error: err });
    }
};

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findOne({ id: id });

    if (!comment) {
        return res.status(404).json({ message: 'comment not found' });
    }

    comment.deleteFlag = 'Y';
    await comment.save();

    return res.status(200).json({ message: 'comment marked as deleted' });
} 