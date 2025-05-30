"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchProducts();
    }, [search, currentPage]);

    const fetchProducts = async () => {
        try {
            const res = await fetch(
                `/api/products?search=${search}&page=${currentPage}&limit=${itemsPerPage}`
            );
            if (!res.ok) throw new Error("Failed to fetch products");
            const data = await res.json();
            console.log("API response:", data);
            if (!data.products || !Array.isArray(data.products)) {
                throw new Error(
                    "Invalid data format: 'products' is not an array"
                );
            }
            setProducts(data.products);
            setTotalPages(Math.ceil(data.total / itemsPerPage));
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setProducts([]);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                const res = await fetch(`/api/products/${id}`, {
                    method: "DELETE",
                });
                if (!res.ok) throw new Error("Failed to delete product");
                fetchProducts();
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "An error occurred"
                );
            }
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Clothing Store
            </h1>
            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="max-w-md"
                />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => (
                        <Card
                            key={product._id}
                            className="hover:shadow-lg transition-shadow duration-300"
                        >
                            <CardHeader>
                                {product.image && (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-t-md"
                                        width={500}
                                        height={500}
                                    />
                                )}
                                <CardTitle className="text-xl font-semibold text-gray-700">
                                    {product.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600 mb-2">
                                    {product.description}
                                </CardDescription>
                                <p className="text-lg font-bold text-green-600">
                                    ${product.price}
                                </p>
                            </CardContent>
                            <CardFooter className="flex space-x-2">
                                <Button asChild>
                                    <Link href={`/products/${product._id}`}>
                                        View
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href={`/edit/${product._id}`}>
                                        Edit
                                    </Link>
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-3 text-center">
                        No products found.
                    </p>
                )}
            </div>
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                            <Button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                variant={
                                    currentPage === page ? "default" : "outline"
                                }
                            >
                                {page}
                            </Button>
                        )
                    )}
                </div>
            )}
        </div>
    );
}
