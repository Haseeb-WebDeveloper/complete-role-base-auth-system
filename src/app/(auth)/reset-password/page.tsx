import { ResetPasswordForm } from "@/components/forms/reset-password-form";
import { redirect } from "next/navigation";

export default function ResetPasswordPage({
    searchParams,
}: {
    searchParams: { email?: string; token?: string };
}) {
    if (!searchParams.email || !searchParams.token) {
        redirect("/forget-password");
    }

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <ResetPasswordForm 
                email={searchParams.email} 
                token={searchParams.token} 
            />
        </div>
    );
}