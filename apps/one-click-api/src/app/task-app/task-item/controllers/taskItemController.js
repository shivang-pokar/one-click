import TaskItem from "../models/taskItemModel";

export const createTask = async (req, res) => {
    try {
        const task = await TaskItem.create(req.body);
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
};



export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const query = { id: id };
        delete req.body.id
        const update = { $set: { ...req.body } };
        const options = { new: true, runValidators: true };

        let task = await TaskItem.findOneAndUpdate(query, update, options);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to update task' });
    }
};


export const getTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskItem.findOne({ id: taskId, deleteFlag: 'N' });

        if (!task) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('Error getting task:', error);
        res.status(500).json({ error: 'Failed to get task' });
    }
};


export const deleteTask = async (req, res) => {

    try {
        const { id } = req.params;
        const task = await TaskItem.findOne({ id: id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.deleteFlag = 'Y';
        await task.save();

        return res.status(200).json({ message: 'Task marked as deleted' });
    } catch (error) {
        console.error('Error marking task as deleted:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const getTaskByGroup = async (req, res) => {
    const { group_id } = req.params;
    try {
        const tasks = await TaskItem.find({ group_id, deleteFlag: 'N' });

        if (!tasks || tasks.length === 0) {
            return res.status(202).json([]);
        }

        // If projects found, return them
        return res.status(200).json([...tasks]);
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}