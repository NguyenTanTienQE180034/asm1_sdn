import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req: NextRequest) {
  await dbConnect();

  const id = req.nextUrl.pathname.split("/").pop(); // Lấy id từ URL

  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error in GET /api/products/[id]:", error);
    return NextResponse.json({ error: "Error fetching product" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();

  const id = req.nextUrl.pathname.split("/").pop();
  const body = await req.json();

  try {
    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error in PUT /api/products/[id]:", error);
    return NextResponse.json({ error: "Error updating product" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();

  const id = req.nextUrl.pathname.split("/").pop();

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error in DELETE /api/products/[id]:", error);
    return NextResponse.json({ error: "Error deleting product" }, { status: 500 });
  }
}
