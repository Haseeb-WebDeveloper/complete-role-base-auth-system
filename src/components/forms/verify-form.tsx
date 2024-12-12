"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
const verifySchema = z.object({
  code: z
    .string()
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d+$/, "Verification code must only contain numbers"),
});

type VerifyValues = z.infer<typeof verifySchema>;

export function VerifyForm({ redirectUrl, email, mode = "signup" }: {
  redirectUrl: string;
  email?: string;
  mode?: "signup" | "reset"
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const emailParam = email || searchParams.get("email");

  const form = useForm<VerifyValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  // this is the function that will be used to handle the otp change in the input field. It will remove all non-numeric characters and limit the length to 6 characters.
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    onChange(value);
  };

  async function onSubmit(data: VerifyValues) {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = mode === "reset" ? "/api/auth/verify-reset-code" : "/api/auth/verify-email-code";
      
      const response = await axios.post(endpoint, {
        email: emailParam,
        code: data.code,
      }); 

      const result = response.data;

      if (!result.success) {
        setError(result.message);
        return;
      }

      // if the mode is reset, then we need to include the verification token in the redirect url
      if (mode === "reset" && result.token) {
        router.push(`/reset-password?email=${emailParam}&token=${result.token}`);
      } else {
        router.push(redirectUrl);
      }

    } catch (error) {
      setError("Verification failed. Please try again.");
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-[400px] w-full space-y-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-center w-full mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-center">Check your email</h3>
          <p className="text-sm text-center text-muted-foreground px-4">
            We've sent a verification code to
            <span className="block font-medium text-foreground mt-1">
              {emailParam || "your email"}
            </span>
          </p>
        </div>
        <div className="p-6 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="• • • • • •"
                        {...field}
                        onChange={(e) => handleOtpChange(e, field.onChange)}
                        className="text-center text-lg tracking-[0.75em] font-mono"
                        maxLength={6}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="one-time-code"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <p className="text-sm font-medium text-destructive text-center">
                  {error}
                </p>
              )}
              <Button 
                className="w-full" 
                type="submit" 
                disabled={isLoading || form.watch("code")?.length !== 6}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Verify Email
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-sm text-center space-y-2">
            <p className="text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={() => {
                  // Add resend code logic here
                }}
                className="text-primary hover:text-primary/90 font-medium"
                disabled={isLoading}
              >
                Click to resend
              </button>
            </p>
            <p className="text-xs text-muted-foreground">
              Please check your spam folder if you don't see the email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 