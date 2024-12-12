"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  const { user } = useAuth();

  return (
    <div className="relative isolate overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 dark:bg-primary/10 blur-[100px]"></div>
      </div>

      {/* Hero Content */}
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center">
              <Link
                href="https://github.com/Haseeb-WebDeveloper/complete-role-base-auth-system"
                target="_blank"
                className="rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-muted hover:ring-foreground transition-colors"
              >
                Open Source on GitHub <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-6xl">
              Next.js Authentication System
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              A production-ready authentication solution with JWT, email verification,
              password reset, and role-based access control.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            {!user ? (
              <>
                <Button asChild size="lg" className="gap-2">
                  <Link href="/signup">
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="gap-2">
                  <Link 
                    href="https://github.com/Haseeb-WebDeveloper/complete-role-base-auth-system"
                    target="_blank"
                  >
                    <Github className="h-4 w-4" />
                    Star on GitHub
                  </Link>
                </Button>
              </>
            ) : (
              <Button asChild size="lg" className="gap-2">
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </motion.div>

          {/* Feature List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl"
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {features.map((feature) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-2xl border bg-background p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.name}</h3>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      {/* <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-primary opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div> */}
    </div>
  );
}

const features = [
  {
    name: "Secure Authentication",
    description: "JWT-based authentication with HTTP-only cookies and automatic token refresh.",
    icon: Lock,
  },
  {
    name: "Email Verification",
    description: "Secure email verification system with OTP for account validation.",
    icon: Mail,
  },
  {
    name: "Password Recovery",
    description: "Complete password reset flow with email verification.",
    icon: KeyRound,
  },
  {
    name: "Role-Based Access",
    description: "Flexible role-based access control for managing user permissions.",
    icon: Shield,
  },
];

import { KeyRound, Lock, Mail, Shield } from "lucide-react";
