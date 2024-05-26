import Project from '../models/projectModel';

export const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
};



export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const query = { id: id };
        const update = { $set: { ...req.body } };
        const options = { new: true };

        let project = await Project.findOneAndUpdate(query, update, options);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: 'Project updated successfully', project });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
};


export const getProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findOne({ id: projectId, deleteFlag: 'N' });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error('Error getting project:', error);
        res.status(500).json({ error: 'Failed to get project' });
    }
};


export const getProjectsByCompanyId = async (req, res) => {
    const { company_id } = req.params;

    try {
        // Find projects where company_id matches
        const projects = await Project.find({ company_id, deleteFlag: 'N' });

        if (!projects || projects.length === 0) {
            return res.status(202).json([]);
        }

        // If projects found, return them
        return res.status(200).json([...projects]);
    } catch (error) {
        console.error('Error retrieving projects:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const deleteProject = async (req, res) => {

    try {
        const { id } = req.params;
        const project = await Project.findOne({ id: id });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.deleteFlag = 'Y';
        await project.save();

        return res.status(200).json({ message: 'Project marked as deleted' });
    } catch (error) {
        console.error('Error marking project as deleted:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
