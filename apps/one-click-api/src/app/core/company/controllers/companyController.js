import { getLabelsFromCompnayId } from '../../label/controllers/labelController';
import Company from '../models/companyModel';

export const createCompany = async (req, res) => {
    try {
        const company = await Company.create(req.body);
        res.status(201).json({ message: 'Company created successfully', company });
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ error: 'Failed to create company' });
    }
};



export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const query = { id: id };
        const update = { $set: { ...req.body } };
        const options = { new: true };

        let company = await Company.findOneAndUpdate(query, update, options);

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        res.status(200).json({ message: 'Company updated successfully', company });
    } catch (error) {
        console.error('Error updating company:', error);
        res.status(500).json({ error: 'Failed to update company' });
    }
};


export const getCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findOne({ id: companyId });
        company.labels = await getLabelsFromCompnayId(company.id)

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        res.status(200).json(company);
    } catch (error) {
        console.error('Error getting company:', error);
        res.status(500).json({ error: 'Failed to get company' });
    }
};

