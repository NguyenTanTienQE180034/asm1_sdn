"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag, User, LogOut } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";

export default function NavBar() {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    const handleSignOut = () => {
        signOut({ callbackUrl: "/" });
    };

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold text-gray-800">
                    Clothing Store
                </h2>
            </div>
            <div className="flex space-x-4">
                <Link href="/" className="text-gray-600 hover:text-primary">
                    <p className="text-gray-600 hover:text-primary text-lg font-semibold">
                        Home
                    </p>
                </Link>
                {session ? (
                    <Link
                        href="/create"
                        className="text-gray-600 hover:text-primary"
                    >
                        <p className="text-gray-600 hover:text-primary text-lg font-semibold">
                            Create Products
                        </p>
                    </Link>
                ) : null}
            </div>
            <div className="flex items-center space-x-4">
                {!pathname.startsWith("/auth") && <SearchBar />}
                {status === "loading" ? (
                    <div className="text-gray-600">Loading...</div>
                ) : session ? (
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2 text-gray-700">
                            <User className="h-5 w-5" />
                            <span className="text-sm">
                                {session.user?.name}
                            </span>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center space-x-1 text-gray-600 hover:text-red-600 px-3 py-1 rounded-md hover:bg-gray-100"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="text-sm">Logout</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex space-x-2">
                        <Link
                            href="/auth/signin"
                            className="px-4 py-2 text-gray-600 hover:text-primary font-medium"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 font-medium"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
