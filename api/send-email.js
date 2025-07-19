const nodemailer = require('nodemailer');
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Missing required form fields.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.RECEIVING_EMAIL, 
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong><br>${message}</p>
            `,
        };
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
};
