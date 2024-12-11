export const verifyMailMessage = (code: string) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <img src="[Your-Logo-URL]" alt="Logo" style="max-width: 150px;" />
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Verify your email address</h2>
            <p style="color: #666; margin-bottom: 20px;">Enter this verification code to get started:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
                <span style="font-size: 32px; letter-spacing: 5px; color: #333; font-weight: bold;">${code}</span>
            </div>
            <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>If you didn't request this code, you can safely ignore this email.</p>
        </div>
    </div>
    `;
};

export const forgotPasswordMailMessage = (code: string) => {
    const message = ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Verify your email address</h2>
                    <p>Your verification code is:</p>
                    <h1 style="font-size: 32px; letter-spacing: 5px; text-align: center; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">${code}</h1>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you didn't request this verification, you can safely ignore this email.</p>
                </div>`
    return message
}
