import bcrypt from 'bcryptjs';

// hashing password
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // 10 is the number of rounds of hashing
    return bcrypt.hash(password, salt); // hashing the password. hashing is a process of converting plain text into a fixed-length string of characters.
}

// comparing password. this is used to compare the password that the user entered with the hashed password that is stored in the database.
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

