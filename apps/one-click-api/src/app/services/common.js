import nodemailer from 'nodemailer';

export const sendEmailProcess = (to, subject, html) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // e.g., smtp.gmail.com for Gmail
        port: 465, // 465 for SSL or 587 for TLS
        secure: true, // true for SSL (465), false for TLS (587)
        auth: {
            user: 'admin@oneclickdesk.com', // Your email address
            pass: 'Shivang@1411', // Your email password or App password (if 2FA enabled)
        },
    });

    // Define email options
    let mailOptions = {
        from: '"One Click Desk" <admin@oneclickdesk.com>', // Sender name and email address
        to: to, // List of receivers
        subject: subject, // Subject line
        html: html
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error: ', error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}