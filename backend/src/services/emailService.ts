import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.EMAIL_PORT || '2525'),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (options: { email: string; subject: string; message: string; html?: string }) => {
    const mailOptions = {
        from: '"AEROSTEP AI" <noreply@aerostep-ai.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };

    try {
        if (process.env.NODE_ENV === 'production') {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${options.email}`);
        } else {
            console.log(`📧 Simulation: Sending email to ${options.email}`);
            console.log(`Subject: ${options.subject}`);
        }
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
};

export const sendOrderConfirmation = async (userEmail: string, orderId: string, total?: number) => {
    return sendEmail({
        email: userEmail,
        subject: 'AEROSTEP AI: Order Confirmed',
        message: `Your gear (Order ID: ${orderId}) is now locked in. Deployment starting soon. Total: $${total || 'N/A'}`,
        html: `<h1>Order Confirmed</h1><p>Your gear (Order ID: <strong>${orderId}</strong>) is now locked in.</p><p>Total: $${total || 'N/A'}</p>`
    });
};

export const sendWelcomeEmail = async (userEmail: string, name: string) => {
    return sendEmail({
        email: userEmail,
        subject: 'AEROSTEP AI: Terminal Access Granted',
        message: `Welcome, ${name}. Your biometric profile is now active on our servers.`,
        html: `<h1>Welcome, ${name}</h1><p>Your biometric profile is now active on our AEROSTEP AI servers.</p>`
    });
};
