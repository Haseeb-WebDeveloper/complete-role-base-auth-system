import { ForgetPasswordForm } from "@/components/forms/forget-password-form";

export default async function ForgetPasswordPage(): Promise<JSX.Element> {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <ForgetPasswordForm />
    </div>
  );
}