"use server";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  await dbConnect();

  const product = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: parseFloat(formData.get("price") as string),
    image: (formData.get("image") as string) || "",
  };

  if (!product.name || !product.description || isNaN(product.price)) {
    throw new Error("Invalid input: name, description, and price are required, and price must be a valid number");
  }

  await Product.create(product); 

  redirect("/");
}
