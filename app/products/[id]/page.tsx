"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ShoppingCart, ArrowLeft, Edit, Star } from "lucide-react";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
}

export default function ProductDetail() {
    const { data: session } = useSession();
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😞</div>
                    <div className="text-red-500 text-xl font-semibold mb-4">
                        Oops! Something went wrong
                    </div>
                    <div className="text-gray-600 mb-6">{error}</div>
                    <Button asChild>
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        );

    if (!product)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <div className="text-gray-600 text-lg">
                        Loading product...
                    </div>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-6">
                <Button variant="ghost" asChild className="mb-6">
                    <Link href="/" className="text-gray-600 hover:text-primary">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Products
                    </Link>
                </Button>

                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    {/* Product Image */}
                    <div className="space-y-4">
                        <Card className="overflow-hidden border-0 shadow-2xl bg-white">
                            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                                {product.image ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={600}
                                        height={600}
                                        className="object-contain w-full h-full rounded-lg"
                                        priority
                                    />
                                ) : (
                                    <div className="text-gray-400 text-center">
                                        <div className="text-6xl mb-4">📷</div>
                                        <div className="text-lg">
                                            No image available
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Product Information */}
                    <div className="space-y-6">
                        <div>
                            <Badge variant="secondary" className="mb-4">
                                Premium Quality
                            </Badge>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-600 text-sm">
                                    (4.8/5 - 124 reviews)
                                </span>
                            </div>
                        </div>

                        <Separator />

                        {/* Price */}
                        <div className="space-y-2">
                            <div className="flex items-baseline space-x-3">
                                <span className="text-4xl font-bold text-green-600">
                                    ${product.price}
                                </span>
                                <span className="text-lg text-gray-500 line-through">
                                    ${(product.price * 1.2).toFixed(2)}
                                </span>
                                <Badge
                                    variant="destructive"
                                    className="text-sm"
                                >
                                    17% OFF
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                                Free shipping on orders over $50
                            </p>
                        </div>

                        <Separator />

                        {/* Description */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Description
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {product.description}
                            </p>
                        </div>

                        {/* Product Features */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Key Features
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span>Premium quality materials</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span>Comfortable and durable design</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span>Available in multiple sizes</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span>30-day return guarantee</span>
                                </li>
                            </ul>
                        </div>

                        <Separator />

                        {/* Action Buttons */}
                        <div className="space-y-4 pt-4">
                            <Button
                                size="lg"
                                className="w-full text-lg h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                            >
                                <ShoppingCart className="mr-3 h-5 w-5" />
                                Add to Cart
                            </Button>

                            {session && (
                                <Button
                                    variant="outline"
                                    size="lg"
                                    asChild
                                    className="w-full text-lg h-12 border-2 hover:bg-gray-50"
                                >
                                    <Link href={`/edit/${product._id}`}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Product
                                    </Link>
                                </Button>
                            )}
                        </div>

                        {/* Additional Info */}
                        <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-600 text-white rounded-full p-2">
                                        <ShoppingCart className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-900">
                                            Free Shipping & Returns
                                        </h4>
                                        <p className="text-blue-700 text-sm">
                                            Fast delivery within 3-5 business
                                            days
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const dynamic = "force-static";
