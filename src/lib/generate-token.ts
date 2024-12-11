import jwt from 'jsonwebtoken';

// Function to generate the email verification token
export const generateEmailVerificationToken = (userId: string) => {
  // Secret key for signing the JWT token (it should be stored securely, for example in an environment variable)
  const secret = process.env.JWT_SECRET || 'hgeufbgewtr436rgyufrefxo2'; 

  // Payload for the token (contains data that is encoded in the token)
  const payload = { userId };

  // Options: Set the expiration time for the token (1 hour in this case)
  const options = { expiresIn: '1h' };

  // Generate and return the JWT token
  return jwt.sign(payload, secret, options);
};
