import { sendEmailProcess } from '../../../services/common';
import Company from '../../company/models/companyModel';
import User from '../../users/models/userModel';
import { genrateInviteEmail } from './commonEmailTemplate';

export const sendEmail = async (req, res, next) => {
    try {
        const { from, to, subject, text, html } = req.body;
        sendEmailProcess(from, to, subject, text, html);
    }
    catch (e) {
        next(e);
    }
}


export const inviteMember = async (req, res, next) => {

    try {
        const { emails, company_id, uid } = req.body;
        const company = await Company.findOne({ id: company_id });
        const user = await User.findOne({ id: uid });

        emails.forEach(element => {
            let html = genrateInviteEmail(element.name, company.company_name, user.name);
            sendEmailProcess(element.name, 'Invite', html);
        });

        res.status(200).json({ message: 'Email sent' });
    }
    catch (e) {
        next(e);
    }

}
