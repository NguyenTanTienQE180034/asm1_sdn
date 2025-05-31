"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                {product.name}
            </h1>
            {product.image && (
                <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full max-w-full h-auto object-contain rounded-lg mb-6"
                    width={500}
                    height={500}
                />
            )}
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-green-600 mb-6">
                ${product.price}
            </p>
            <Link
                href={`/edit/${product._id}`}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
                Edit Product
            </Link>
        </div>
    );
}

export const dynamic = "force-static";
