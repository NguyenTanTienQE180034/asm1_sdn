import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Clothing E-commerce",
    description: "A Next.js e-commerce platform for clothing",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="container mx-auto p-4">
                <nav className="mb-4">
                    <Link href="/" className="mr-4 text-blue-500">
                        Home
                    </Link>
                    <Link href="/create" className="text-blue-500">
                        Create Product
                    </Link>
                </nav>
                {children}
            </body>
        </html>
    );
}
