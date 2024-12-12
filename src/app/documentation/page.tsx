"use client";

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Navbar } from "@/components/layout/navbar"
export default function DocumentationPage() {
  return (
    <>
      <Navbar />
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
        <AppSidebar className="hidden lg:block" />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-8">
          <div className="container max-w-4xl py-6 lg:py-10">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/documentation">Documentation</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Getting Started</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Content */}
            <div className="space-y-6">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
                Getting Started
              </h1>
              <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                This authentication system provides a complete solution for handling user authentication in Next.js applications. 
                It includes features like JWT-based authentication, email verification, password reset, and role-based access control.
              </p>

              {/* Installation Section */}
              <section className="space-y-4">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Installation
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Clone the repository and install dependencies:
                </p>
                <pre className="overflow-x-auto rounded-lg border bg-muted p-4">
                  <code>
                    {`git clone https://github.com/Haseeb-WebDeveloper/complete-role-base-auth-system
cd complete-role-base-auth-system
npm install`}
                  </code>
                </pre>
              </section>

              {/* Configuration Section */}
              <section className="space-y-4">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Configuration
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Create a <code className="rounded bg-muted px-1">.env</code> file in the root directory with the following variables:
                </p>
                <pre className="overflow-x-auto rounded-lg border bg-muted p-4">
                  <code>
                    {`MONGODB_URI=your_mongodb_connection_string
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_sender_email
FRONTEND_URL=http://localhost:3000

JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_ACCESS_TOKEN_EXPIRES_IN=1h
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
JWT_REFRESH_TOKEN_EXPIRES_IN=7d
JWT_RESET_TOKEN_SECRET=your_reset_token_secret
JWT_RESET_TOKEN_EXPIRES_IN=15m`}
                  </code>
                </pre>
              </section>

              {/* Features Section */}
              <section className="space-y-4">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Features
                </h2>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  <li>JWT-based authentication with access and refresh tokens</li>
                  <li>Secure password hashing with bcrypt</li>
                  <li>Email verification system</li>
                  <li>Password reset functionality</li>
                  <li>Role-based access control</li>
                  <li>Protected routes and API endpoints</li>
                  <li>Automatic token refresh</li>
                  <li>Dark mode support</li>
                  <li>Responsive design</li>
                </ul>
              </section>

              {/* API Routes Section */}
              <section className="space-y-4">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  API Routes
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2 text-left font-medium">Endpoint</th>
                        <th className="border px-4 py-2 text-left font-medium">Method</th>
                        <th className="border px-4 py-2 text-left font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">/api/auth/signup</td>
                        <td className="border px-4 py-2">POST</td>
                        <td className="border px-4 py-2">Register a new user</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">/api/auth/login</td>
                        <td className="border px-4 py-2">POST</td>
                        <td className="border px-4 py-2">Authenticate user</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">/api/auth/logout</td>
                        <td className="border px-4 py-2">POST</td>
                        <td className="border px-4 py-2">Log out user</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">/api/auth/verify-email-code</td>
                        <td className="border px-4 py-2">POST</td>
                        <td className="border px-4 py-2">Verify email with OTP</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">/api/auth/forget-password</td>
                        <td className="border px-4 py-2">POST</td>
                        <td className="border px-4 py-2">Request password reset</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">/api/auth/reset-password</td>
                        <td className="border px-4 py-2">POST</td>
                        <td className="border px-4 py-2">Reset password with token</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">/api/auth/me</td>
                        <td className="border px-4 py-2">GET</td>
                        <td className="border px-4 py-2">Get current user info</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">/api/auth/refresh</td>
                        <td className="border px-4 py-2">POST</td>
                        <td className="border px-4 py-2">Refresh access token</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
    </>
  )
}
