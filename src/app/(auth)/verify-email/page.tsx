import { VerifyForm } from "@/components/forms/verify-form";
import { redirect } from "next/navigation";

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  // Redirect if no email is provided
  if (!searchParams.email) {
    redirect("/signup");
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <VerifyForm />
    </div>
  );
} 