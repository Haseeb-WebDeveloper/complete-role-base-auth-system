# Role-Based Authentication System with Next.js

This repository contains a robust, scalable, and reusable role-based authentication system built with **Next.js** and **MongoDB**. Designed with flexibility in mind, this system supports various roles and provides comprehensive account management features while adhering to security best practices.

---

## Features

### Authentication
- User registration (signup) with email verification.
- Login with secure password hashing (using bcrypt).
- Token-based authentication with **JWT**.
- Forgot and reset password functionality.

### Role-Based Access Control (RBAC)
- Three predefined roles: `User`, `Moderator`, and `Admin`.
- Middleware for role-based access to protected routes.

### Account Management
- Edit account details (username, email, password, etc.).
- Full email verification workflow.
- Active and audit logs for tracking account activities.

### Security
- Password hashing and secure token storage.
- HTTP-only cookies for access and refresh token management.
- Two-step verification using email (optional for MVP).
- IP and device whitelisting (optional).

### Reusability
- Clean and modular codebase for easy integration into any application.
- Separate folders for models, utilities, types, and interfaces.
- Typescript for strong typing and scalability.

---

## Technologies Used
- **Next.js**: Framework for server-side rendering and API routing.
- **MongoDB**: NoSQL database for scalable and flexible data storage.
- **TypeScript**: Ensures type safety and better code maintainability.
- **bcryptjs**: For secure password hashing.
- **jsonwebtoken (JWT)**: For token-based authentication.
- **Nodemailer**: For sending verification and reset emails.
- **Cookie Parser**: To manage HTTP-only cookies securely.

---

## Folder Structure

```
/auth-system
│
├── /src
│   ├── /app
│   │   ├── /api/auth      # API routes for authentication
│   │   │   ├── signup/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── verify-email/route.ts
│   │   │   ├── forgot-password/route.ts
│   │   │   └── reset-password/route.ts
│   │   ├── layout.tsx     # Global layout file
│   │   └── page.tsx       # Entry page (e.g., for login or home)
│   │
│   ├── /lib
│   │   ├── dbConnect.ts   # MongoDB connection helper
│   │   ├── auth.ts        # Authentication utilities (JWT, bcrypt)
│   │   └── roleMiddleware.ts  # Middleware for role-based access
│   │
│   ├── /models
│   │   └── User.ts        # User schema for MongoDB
│   │
│   ├── /types
│   │   ├── user.ts        # Type definitions for user objects
│   │   └── index.ts       # Shared type definitions
│   │
│   ├── /interfaces
│   │   ├── user.interface.ts # Interfaces for user schema
│   │   └── auth.interface.ts # Interfaces for authentication flows
│   │
│   ├── /utils
│   │   ├── sendEmail.ts   # Helper to send emails
│   │   ├── generateToken.ts   # Helper for JWT token generation
│   │   └── validateInput.ts   # Input validation functions
│   │
│   └── /styles
│       └── globals.css    # Global styles
│
├── .env                   # Environment variables
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── next.config.js         # Next.js configuration
└── package.json           # Project dependencies
```

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Haseeb-WebDeveloper/complete-role-base-auth-system.git
   cd auth-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the `.env` file with your environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork the repository and submit a pull request. 

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

