import TaskGroup from "../models/taskGroupModel";

export const createGroup = async (req, res) => {
    try {
        const group = await TaskGroup.create(req.body);
        res.status(201).json({ message: 'Group created successfully', group });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Failed to create group' });
    }
};



export const updateGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const query = { id: id };
        const update = { $set: { ...req.body } };
        const options = { new: true };

        let group = await TaskGroup.findOneAndUpdate(query, update, options);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.status(200).json({ message: 'Group updated successfully', group });
    } catch (error) {
        console.error('Error updating group:', error);
        res.status(500).json({ error: 'Failed to update group' });
    }
};


export const getGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        const group = await TaskGroup.findOne({ id: groupId, deleteFlag: 'N' });

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.status(200).json(group);
    } catch (error) {
        console.error('Error getting group:', error);
        res.status(500).json({ error: 'Failed to get group' });
    }
};


export const getGroupByProjectId = async (req, res) => {
    const { project_id } = req.params;

    try {
        const group = await TaskGroup.find({ project_id, deleteFlag: 'N' });

        if (!group || group.length === 0) {
            return res.status(202).json([]);
        }

        // If projects found, return them
        return res.status(200).json([...group]);
    } catch (error) {
        console.error('Error retrieving groups:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const deleteGroup = async (req, res) => {

    try {
        const { id } = req.params;
        const group = await TaskGroup.findOne({ id: id });

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        group.deleteFlag = 'Y';
        await group.save();

        return res.status(200).json({ message: 'Group marked as deleted' });
    } catch (error) {
        console.error('Error marking group as deleted:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
