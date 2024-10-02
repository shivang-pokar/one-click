import nodemailer from 'nodemailer';

export const sendEmailProcess = (from, to, subject, text, html) => {
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
        from: '"Your Name" <admin@oneclickdesk.com>', // Sender name and email address
        to: 'shivang.patel503@gmail.com', // List of receivers
        subject: 'Hello from Node.js', // Subject line
        text: 'This is a test email sent from Node.js', // Plain text body
        html: '<b>This is a test email sent from Node.js</b>', // HTML body (optional)
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error: ', error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}