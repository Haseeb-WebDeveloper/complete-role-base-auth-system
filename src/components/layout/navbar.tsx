"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Menu, Github, ExternalLink } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const { user, logout, isLoading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between mx-auto">
                {/* Logo/Brand */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="font-bold text-xl">
                        AuthSystem
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link 
                            href="/" 
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Home
                        </Link>
                        <Link 
                            href="/documentation" 
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Documentation
                        </Link>
                        {user && (
                            <Link 
                                href="/dashboard" 
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    <Link
                        href="https://github.com/Haseeb-WebDeveloper/complete-role-base-auth-system"
                        target="_blank"
                        className="hidden md:inline-flex"
                    >
                        <Button variant="outline" size="icon">
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                        </Button>
                    </Link>
                    <ModeToggle />
                    
                    {/* Auth Buttons / User Menu */}
                    <div className="hidden md:block">
                        {isLoading ? (
                            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                        ) : user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button 
                                        variant="outline" 
                                        className="relative h-8 w-8 rounded-full"
                                    >
                                        <User className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <div className="flex items-center justify-start gap-2 p-2">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                    <DropdownMenuItem 
                                        onClick={() => logout()}
                                        className="text-red-600 cursor-pointer"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" asChild>
                                    <Link href="/login">Log in</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/signup">Sign up</Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        className="md:hidden"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t p-4">
                    <div className="flex flex-col space-y-4">
                        <Link 
                            href="/"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/documentation"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Documentation
                        </Link>
                        {user && (
                            <Link 
                                href="/dashboard"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                        )}
                        {user ? (
                            <>
                                <div className="pt-4 border-t">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{user.name}</span>
                                            <span className="text-xs text-muted-foreground">{user.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="justify-start text-red-600 px-0"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </Button>
                            </>
                        ) : (
                            <div className="flex flex-col space-y-4 pt-4 border-t">
                                <Button variant="ghost" asChild>
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        Log in
                                    </Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                                        Sign up
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}