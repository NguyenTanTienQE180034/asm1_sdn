"use client";

import "./globals.css";
import Link from "next/link";
import { ShoppingBag, Instagram, Twitter, Facebook } from "lucide-react";
import { SearchProvider } from "@/context/SearchContext";
import { SearchBar } from "@/components/SearchBar";
import { usePathname } from "next/navigation";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";

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
                    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <ShoppingBag className="h-8 w-8 text-primary" />
                            <h2 className="text-2xl font-bold text-gray-800">
                                Clothing Store
                            </h2>
                        </div>
                        <div className="flex space-x-4">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-primary"
                            >
                                <p className="text-gray-600 hover:text-primary texl-lg font-semibold">
                                    Home
                                </p>
                            </Link>
                            <Link
                                href="/create"
                                className="text-gray-600 hover:text-primary"
                            >
                                <p className="text-gray-600 hover:text-primary texl-lg font-semibold">
                                    Create Products
                                </p>
                            </Link>
                        </div>

                        <SearchBar />
                    </nav>

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
                    {pathname === "/" && (
                        <h2 className="text-3xl font-bold text-center mt-8 mb-4 text-gray-800">
                            Products List
                        </h2>
                    )}
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
            </body>
        </html>
    );
}
