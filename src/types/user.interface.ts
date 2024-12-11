interface User {
    name: string;
    email: string;
    password: string;
    role: string;
    isVerified: boolean;
    verificationCode: string;
    status: string;
}

export type { User };

