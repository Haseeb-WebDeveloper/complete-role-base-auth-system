export const verifyMailMessage = (code: string) => {
    const message = ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Verify your email address</h2>
                    <p>Your verification code is:</p>
                    <h1 style="font-size: 32px; letter-spacing: 5px; text-align: center; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">${code}</h1>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you didn't request this verification, you can safely ignore this email.</p>
                </div>`
    return message
}

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
