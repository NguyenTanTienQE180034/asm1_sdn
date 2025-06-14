"use client";

import "./globals.css";
import Link from "next/link";
import {
    ShoppingBag,
    Instagram,
    Twitter,
    Facebook,
    User,
    LogOut,
} from "lucide-react";
import { SearchProvider } from "@/context/SearchContext";
import { SearchBar } from "@/components/SearchBar";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import SessionProvider from "@/components/SessionProvider";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";

function NavBar() {
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
                {/* Chỉ hiển thị SearchBar khi không ở trang auth */}
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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Kiểm tra xem có phải là trang auth không (signup, signin, etc.)
    const isAuthPage = pathname.startsWith("/auth");

    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col">
                <SessionProvider session={null}>
                    <SearchProvider>
                        {/* NavBar chỉ hiển thị khi KHÔNG phải trang auth */}
                        {!isAuthPage && <NavBar />}

                        {/* Banner chỉ hiển thị trên trang chủ */}
                        {pathname === "/" && (
                            <section className="w-full py-4 px-0 overflow-x-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <Image
                                            src="/anh1.png"
                                            width={800}
                                            height={600}
                                            alt="Sale Banner 1"
                                            className="w-full h-[600px] object-contain rounded-3xl border-4 border-gray-300 shadow-md ml-2"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <Carousel className="w-full relative">
                                            <CarouselContent>
                                                <CarouselItem className="h-[600px]">
                                                    <Image
                                                        src="/anh2.png"
                                                        width={800}
                                                        height={600}
                                                        alt="Sale Banner 1"
                                                        className="w-full h-[600px] object-contain rounded-lg"
                                                    />
                                                </CarouselItem>
                                                <CarouselItem>
                                                    <Image
                                                        src="/anh3.png"
                                                        width={800}
                                                        height={600}
                                                        alt="Sale Banner 2"
                                                        className="w-full h-[600px] object-contain rounded-lg"
                                                    />
                                                </CarouselItem>
                                                <CarouselItem>
                                                    <Image
                                                        src="/anh4.png"
                                                        width={800}
                                                        height={600}
                                                        alt="Sale Banner 3"
                                                        className="w-full h-[600px] object-contain rounded-lg"
                                                    />
                                                </CarouselItem>
                                            </CarouselContent>

                                            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-200 rounded-full shadow h-10 w-10 flex items-center justify-center" />

                                            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-200 rounded-full shadow h-10 w-10 flex items-center justify-center" />
                                        </Carousel>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Tiêu đề Products List chỉ hiển thị trên trang chủ */}
                        {pathname === "/" && (
                            <h2 className="text-3xl font-bold text-center mt-8 mb-4 text-gray-800">
                                Products List
                            </h2>
                        )}

                        {/* Main content với padding khác nhau cho auth pages */}
                        <main
                            className={`flex-grow ${
                                isAuthPage ? "p-0" : "p-4"
                            }`}
                        >
                            {children}
                        </main>

                        {/* Footer chỉ hiển thị khi KHÔNG phải trang auth */}
                        {!isAuthPage && (
                            <footer className="bg-gray-800 text-white p-4 mt-6">
                                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                                    <div className="mb-4 md:mb-0">
                                        <h3 className="text-xl font-semibold">
                                            Clothing Store
                                        </h3>
                                        <p className="text-sm mt-2">
                                            © {new Date().getFullYear()}{" "}
                                            Clothing E-commerce. All rights
                                            reserved.
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
                        )}
                    </SearchProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
