import User from '../models/userModel';

export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const query = { id: id };
        const update = { $set: { ...req.body } };
        const options = { new: true };

        let user = await User.findOneAndUpdate(query, update, options);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};


export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ id: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Failed to get user' });
    }
};