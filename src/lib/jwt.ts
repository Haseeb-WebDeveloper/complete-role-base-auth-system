import jwt from 'jsonwebtoken';

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET!;
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET!;
const JWT_RESET_TOKEN_SECRET = process.env.JWT_RESET_TOKEN_SECRET!;
const JWT_ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!;
const JWT_REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN!;
const JWT_RESET_TOKEN_EXPIRES_IN = process.env.JWT_RESET_TOKEN_EXPIRES_IN!; 

// this is the function that will be used to generate the access token. It will take the payload and the expiration time as arguments.
export const generateToken = (payload: object) => {
    return jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN });
};

// this is the function that will be used to generate the refresh token. It will take the payload and the expiration time as arguments.
export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, { expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN });
};

// reset token is used to reset the password. It will take the payload and the expiration time as arguments.
export const generateResetToken = (payload: object) => {
    return jwt.sign(payload, JWT_RESET_TOKEN_SECRET, { expiresIn: JWT_RESET_TOKEN_EXPIRES_IN });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, JWT_REFRESH_TOKEN_SECRET);
};

export const verifyResetToken = (token: string) => {
    return jwt.verify(token, JWT_RESET_TOKEN_SECRET);
};
