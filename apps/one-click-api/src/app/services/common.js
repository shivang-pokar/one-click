import nodemailer from 'nodemailer';

export const sendEmailProcess = (from, to, subject, text, html) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.your-email-provider.com', // e.g., smtp.gmail.com for Gmail
        port: 587, // 465 for SSL or 587 for TLS
        secure: false, // true for SSL (465), false for TLS (587)
        auth: {
            user: 'your-email@domain.com', // Your email address
            pass: 'your-email-password', // Your email password or App password (if 2FA enabled)
        },
    });

    // Define email options
    let mailOptions = {
        from: '"Your Name" <email@mydomain.com>', // Sender name and email address
        to: 'recipient@example.com', // List of receivers
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