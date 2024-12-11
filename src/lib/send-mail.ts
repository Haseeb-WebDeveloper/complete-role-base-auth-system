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

export async function sendVerificationEmail(to: string, message: string) {
    try {
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to,
            subject: "Verify your email address",
            html: message,
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

