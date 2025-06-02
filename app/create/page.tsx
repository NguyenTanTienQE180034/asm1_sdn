"use client";

import { useState, useTransition } from "react";
import { createProduct } from "../action";
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

export default function CreateProduct() {
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setError(null);
        startTransition(async () => {
            try {
                let imageUrl = "";
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
                    formData.set("image", imageUrl);
                }

                await createProduct(formData);
                setForm({ name: "", description: "", price: "", image: "" });
                setImageFile(null);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "An error occurred while creating the product"
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
                    <CardTitle>Create Product</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            handleSubmit(formData);
                        }}
                        className="space-y-6"
                    >
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
                        </div>
                        <CardFooter className="p-0 pt-4">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full"
                            >
                                {isPending ? "Creating..." : "Create"}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
