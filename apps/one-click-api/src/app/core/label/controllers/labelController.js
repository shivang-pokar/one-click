import { randomUUID } from "crypto";
import Label from "../models/labelModel";


export const createLabel = async (req, res) => {
    try {
        const label = await Label.create(req.body);
        res.status(201).json({ message: 'Label created successfully', label });
    } catch (error) {
        console.error('Error creating label:', error);
        res.status(500).json({ error: 'Failed to create label' });
    }
};

export const createLabelList = async (req, res) => {

    try {
        let labels = req.body.labels;
        if (labels.length) {
            for (let label of labels) {
                await findLabelFromId(label);
            }
            res.status(200).json({ message: 'Label created successfully' });
        } else {
            res.status(201).json({ message: 'No labels to create' });
        }
    }
    catch (error) {
        console.error('Error creating label:', error);
        res.status(500).json({ error: 'Failed to create label' });
    }

}

const findLabelFromId = async (body) => {
    const query = { id: body.id };
    const update = { $set: { ...body } };
    const options = { new: true, upsert: true };
    return Label.findOneAndUpdate(query, update, options);
}

export const getLabelsFromCompnayId = async (company_id) => {
    return Label.find({ company_id: company_id, deleteFlag: "N" });

}