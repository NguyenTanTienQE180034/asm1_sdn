"use client";

import { useState, useEffect, useTransition } from "react";
import { useParams } from "next/navigation";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function EditProduct() {
    const { id } = useParams() as { id: string };

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
    });

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/products/${id}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to load product");
                    return res.json();
                })
                .then((data) =>
                    setForm({
                        name: data.name,
                        description: data.description,
                        price: data.price.toString(), // chuyển về string cho input
                        image: data.image || "",
                    })
                )
                .catch((err) => setError(err.message));
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        startTransition(async () => {
            try {
                let imageUrl = form.image;

                // Nếu có ảnh mới
                if (imageFile) {
                    const imageData = new FormData();
                    imageData.append("image", imageFile);

                    const uploadRes = await fetch("/api/upload", {
                        method: "POST",
                        body: imageData,
                    });

                    if (!uploadRes.ok) {
                        const errorData = await uploadRes.json();
                        throw new Error(
                            errorData.error || "Failed to upload image"
                        );
                    }

                    const { url } = await uploadRes.json();
                    imageUrl = url;
                }

                const res = await fetch(`/api/products/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: form.name,
                        description: form.description,
                        price: parseFloat(form.price),
                        image: imageUrl,
                    }),
                });

                if (res.ok) {
                    window.location.href = "/";
                } else {
                    throw new Error("Failed to update product");
                }
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "An error occurred"
                );
            }
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Product</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    })
                                }
                                required
                                className="h-24"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={(e) =>
                                    setForm({ ...form, price: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image">Image</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {form.image && (
                                <Image
                                    src={form.image}
                                    alt="Current product"
                                    className="mt-2 w-32 h-32 object-cover rounded-md"
                                    width={200}
                                    height={200}
                                />
                            )}
                        </div>
                        <CardFooter className="p-0 pt-4">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full"
                            >
                                {isPending ? "Updating..." : "Update"}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export const dynamic = "force-static";
