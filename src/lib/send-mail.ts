import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendVerificationEmail(to: string, code: string) {
    try {
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to,
            subject: "Verify your email address",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Verify your email address</h2>
                    <p>Your verification code is:</p>
                    <h1 style="font-size: 32px; letter-spacing: 5px; text-align: center; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">${code}</h1>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you didn't request this verification, you can safely ignore this email.</p>
                </div>
            `,
        });
    } catch (error) {
        console.error("Email sending error:", error);
        throw new Error("Failed to send verification email");
    }
}

// Add this function for testing
export async function testEmailConfig() {
  try {
    await transporter.verify();
    console.log("SMTP configuration is valid");
    return true;
  } catch (error) {
    console.error("SMTP configuration error:", error);
    return false;
  }
}

