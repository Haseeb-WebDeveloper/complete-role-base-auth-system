import { VerifyForm } from "@/components/forms/verify-form";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { email?: string; mode?: string };
}) {
  if (!searchParams.email) {
    redirect("/signup");
  }

  const mode = searchParams.mode === "reset" ? "reset" : "signup";
  const redirectUrl = mode === "reset" ? "/reset-password" : "/login";

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <VerifyForm 
        redirectUrl={redirectUrl} 
        email={searchParams.email} 
        mode={mode} 
      />
    </div>
  );
}