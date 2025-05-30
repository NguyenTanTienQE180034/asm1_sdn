"use server";

import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const product = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: parseFloat(formData.get("price") as string),
    image: formData.get("image") as string || "",
  };

  console.log("Sending product data to API:", product);

  // Kiểm tra dữ liệu trước khi gửi
  if (!product.name || !product.description || isNaN(product.price)) {
    throw new Error("Invalid input: name, description, and price are required, and price must be a valid number");
  }

  const res = await fetch("http://localhost:3000/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (res.ok) {
    redirect("/");
  } else {
    let errorData;
    try {
      errorData = await res.json();
    } catch (jsonError) {
      console.error("Failed to parse API response as JSON:", jsonError);
      throw new Error(`Failed to create product: API returned invalid response (status ${res.status})`);
    }
    console.error("API error response:", errorData);
    throw new Error(errorData.error || `Failed to create product (status ${res.status})`);
  }
}