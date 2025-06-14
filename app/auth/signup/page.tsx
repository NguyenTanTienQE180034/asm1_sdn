"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    ShoppingBag,
    ArrowRight,
    AlertCircle,
    Loader2,
    CheckCircle,
} from "lucide-react";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                router.push("/auth/signin?message=Registration successful");
            } else {
                const data = await response.json();
                setError(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Password strength indicator
    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { strength: 0, text: "" };
        if (password.length < 6) return { strength: 1, text: "Weak" };
        if (password.length < 8) return { strength: 2, text: "Fair" };
        if (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password)
        ) {
            return { strength: 3, text: "Strong" };
        }
        return { strength: 2, text: "Good" };
    };

    const passwordStrength = getPasswordStrength(password);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
                        <ShoppingBag className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Join Our Store
                    </h1>
                    <p className="text-gray-600">
                        Create your account and start shopping
                    </p>
                </div>

                {/* Sign Up Card */}
                <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-semibold text-center text-gray-800">
                            Create Account
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                                <span className="text-sm text-red-700">
                                    {error}
                                </span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="name"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Create a strong password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="pl-10 pr-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                                        minLength={6}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {password && (
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all duration-300 ${
                                                        passwordStrength.strength ===
                                                        1
                                                            ? "w-1/3 bg-red-500"
                                                            : passwordStrength.strength ===
                                                              2
                                                            ? "w-2/3 bg-yellow-500"
                                                            : passwordStrength.strength ===
                                                              3
                                                            ? "w-full bg-green-500"
                                                            : "w-0"
                                                    }`}
                                                ></div>
                                            </div>
                                            <span
                                                className={`text-xs font-medium ${
                                                    passwordStrength.strength ===
                                                    1
                                                        ? "text-red-600"
                                                        : passwordStrength.strength ===
                                                          2
                                                        ? "text-yellow-600"
                                                        : "text-green-600"
                                                }`}
                                            >
                                                {passwordStrength.text}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Password must be at least 6
                                            characters long
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Terms Agreement */}
                            <div className="flex items-start space-x-2 text-sm text-gray-600">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <p>
                                    By creating an account, you agree to our{" "}
                                    <Link
                                        href="/terms"
                                        className="text-green-600 hover:underline"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy"
                                        className="text-green-600 hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>
                                </p>
                            </div>

                            {/* Sign Up Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="relative">
                            <Separator />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-white px-3 text-sm text-gray-500">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        {/* Sign In Link */}
                        <div className="text-center">
                            <Link
                                href="/auth/signin"
                                className="inline-flex items-center text-sm text-green-600 hover:text-green-800 font-medium hover:underline"
                            >
                                Sign in to your account
                                <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Security Features */}
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center space-y-1">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Lock className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-xs text-gray-600">Secure</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mail className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-xs text-gray-600">Verified</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-xs text-gray-600">Trusted</span>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
            <div className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse delay-500"></div>
        </div>
    );
}
