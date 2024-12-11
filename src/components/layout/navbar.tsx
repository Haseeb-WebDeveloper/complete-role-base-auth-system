"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const { user, logout, isLoading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="border-b bg-background">
            <div className="container flex items-center justify-between h-16">
                {/* Logo/Brand */}
                <Link href="/" className="font-bold text-xl">
                    YourBrand
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link 
                        href="/" 
                        className="text-foreground/60 hover:text-foreground transition-colors"
                    >
                        Home
                    </Link>
                    {user && (
                        <Link 
                            href="/dashboard" 
                            className="text-foreground/60 hover:text-foreground transition-colors"
                        >
                            Dashboard
                        </Link>
                    )}
                    {user?.role === 'admin' && (
                        <Link 
                            href="/admin" 
                            className="text-foreground/60 hover:text-foreground transition-colors"
                        >
                            Admin
                        </Link>
                    )}
                </div>

                {/* Auth Buttons / User Menu */}
                <div className="hidden md:block">
                    {isLoading ? (
                        <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                    ) : user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    className="relative h-8 w-8 rounded-full"
                                >
                                    <User className="h-5 w-5" />
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
                        <div className="flex items-center space-x-4">
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
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t p-4">
                    <div className="flex flex-col space-y-4">
                        <Link 
                            href="/"
                            className="text-foreground/60 hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        {user && (
                            <Link 
                                href="/dashboard"
                                className="text-foreground/60 hover:text-foreground transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                        )}
                        {user?.role === 'admin' && (
                            <Link 
                                href="/admin"
                                className="text-foreground/60 hover:text-foreground transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Admin
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