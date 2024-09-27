import { sendEmailProcess } from '../../../services/common';

export const sendEmail = async (req, res) => {
    const { from, to, subject, text, html } = req.body;
    sendEmailProcess(from, to, subject, text, html);
}
