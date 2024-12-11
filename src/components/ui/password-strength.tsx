"use client";

import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const calculateStrength = (password: string) => {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Lowercase check
    if (/[a-z]/.test(password)) strength += 1;
    
    // Number check
    if (/\d/.test(password)) strength += 1;
    
    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };

  const getStrengthText = (strength: number) => {
    if (password.length === 0) return "";
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Medium";
    if (strength <= 4) return "Strong";
    return "Very Strong";
  };

  const getStrengthColor = (strength: number) => {
    if (password.length === 0) return "bg-muted";
    if (strength <= 2) return "bg-destructive";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-green-500";
    return "bg-green-500";
  };

  const strength = calculateStrength(password);
  const strengthText = getStrengthText(strength);
  const strengthColor = getStrengthColor(strength);

  return (
    <div className="space-y-2 pt-2">
      <div className="flex gap-1 h-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-full w-full transition-all rounded-full",
              i < strength ? strengthColor : "bg-muted"
            )}
          />
        ))}
      </div>
      {password.length > 0 && (
        <div className="text-xs flex justify-between text-muted-foreground">
          <span>{strengthText} password</span>
          <span className="text-xs">
            {strength}/5 requirements met
          </span>
        </div>
      )}
      <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2">
        <div className={cn(
          "flex items-center gap-1",
          /[A-Z]/.test(password) ? "text-green-500" : ""
        )}>
          • Uppercase letter
        </div>
        <div className={cn(
          "flex items-center gap-1",
          /[a-z]/.test(password) ? "text-green-500" : ""
        )}>
          • Lowercase letter
        </div>
        <div className={cn(
          "flex items-center gap-1",
          /\d/.test(password) ? "text-green-500" : ""
        )}>
          • Number
        </div>
        <div className={cn(
          "flex items-center gap-1",
          /[^A-Za-z0-9]/.test(password) ? "text-green-500" : ""
        )}>
          • Special character
        </div>
        <div className={cn(
          "flex items-center gap-1",
          password.length >= 8 ? "text-green-500" : ""
        )}>
          • 8+ characters
        </div>
      </div>
    </div>
  );
} 