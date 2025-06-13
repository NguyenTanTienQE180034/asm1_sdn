"use client";

import "./globals.css";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { SearchProvider } from "@/context/SearchContext";
import { SearchBar } from "@/components/SearchBar";
import { usePathname } from "next/navigation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col">
                <SearchProvider>
                    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg p-5 flex justify-between items-center sticky top-0 z-50">
                        <div className="flex items-center space-x-3">
                            <ShoppingBag className="h-9 w-9 text-white" />
                            <h2 className="text-3xl font-extrabold text-white tracking-tight">
                                Clothing Store
                            </h2>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Link href="/">
                                <p className="text-white text-lg font-medium hover:text-yellow-300 transition-colors duration-300">
                                    Home
                                </p>
                            </Link>
                            <Link href="/create">
                                <p className="text-white text-lg font-medium hover:text-yellow-300 transition-colors duration-300">
                                    Create Products
                                </p>
                            </Link>
                            <div className="relative">
                                <SearchBar />
                            </div>
                        </div>
                    </nav>
                    {pathname === "/" && (
                        <h2 className="text-3xl font-bold text-center mt-8 mb-4 text-gray-800">
                            Products List
                        </h2>
                    )}
                    <main className="flex-grow p-6 bg-gray-50">{children}</main>
                </SearchProvider>
            </body>
        </html>
    );
}
