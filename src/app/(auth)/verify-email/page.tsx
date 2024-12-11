import { VerifyForm } from "@/components/forms/verify-form";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  // Redirect if no email is provided
  if (!(await searchParams).email) {
    redirect("/signup");
  }

  return (
      <VerifyForm redirectUrl="/login" />
  );
}