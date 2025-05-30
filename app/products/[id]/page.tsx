"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
}

export default function ProductDetail() {
    const { id } = useParams() as { id: string };
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/products/${id}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch product");
                    return res.json();
                })
                .then((data) => setProduct(data))
                .catch((err) => setError(err.message));
        }
    }, [id]);

    if (error)
        return (
            <div className="text-red-500 text-center mt-10">Error: {error}</div>
        );
    if (!product)
        return (
            <div className="text-gray-500 text-center mt-10">Loading...</div>
        );

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    {product.image && (
                        <Image
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 object-cover rounded-t-md mb-6"
                            width={500}
                            height={500}
                        />
                    )}
                    <CardDescription className="mb-4">
                        {product.description}
                    </CardDescription>
                    <p className="text-2xl font-bold text-green-600 mb-6">
                        ${product.price}
                    </p>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={`/edit/${product._id}`}>Edit Product</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export const dynamic = "force-static";
