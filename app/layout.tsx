import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/SessionProvider";
import NavBar from "@/components/NavBar";
import { Instagram, Twitter, Facebook } from "lucide-react";
import "./globals.css";
import { SearchProvider } from "@/context/SearchContext";
import CarouselSection from "@/components/CarouselSection";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col">
                <SessionProvider session={session}>
                    <SearchProvider>
                        <NavBar />
                        <CarouselSection />
                        <main className="flex-grow p-4">{children}</main>
                        <footer className="bg-gray-800 text-white p-4 mt-6">
                            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                                <div className="mb-4 md:mb-0">
                                    <h3 className="text-xl font-semibold">
                                        Clothing Store
                                    </h3>
                                    <p className="text-sm mt-2">
                                        © {new Date().getFullYear()} Clothing
                                        E-commerce. All rights reserved.
                                    </p>
                                </div>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Instagram className="h-6 w-6 hover:text-gray-300" />
                                    </a>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Twitter className="h-6 w-6 hover:text-gray-300" />
                                    </a>
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Facebook className="h-6 w-6 hover:text-gray-300" />
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </SearchProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
