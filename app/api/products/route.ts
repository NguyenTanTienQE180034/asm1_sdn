import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req: NextRequest) {
    await dbConnect();

    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "8", 10);
        const skip = (page - 1) * limit;

        const query = search ? { name: { $regex: search, $options: "i" } } : {};
        const [products, total] = await Promise.all([
            Product.find(query).skip(skip).limit(limit),
            Product.countDocuments(query),
        ]);

        return NextResponse.json({ products, total });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Error fetching products";
        console.error("Error in GET /api/products:", errorMessage);
        return NextResponse.json(
            { products: [], total: 0, error: errorMessage },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        console.log("Received data for creating product:", body);

        // Kiểm tra dữ liệu đầu vào
        if (
            !body.name ||
            !body.description ||
            !body.price ||
            isNaN(body.price)
        ) {
            return NextResponse.json(
                {
                    error: "Invalid input: name, description, and price are required, and price must be a number",
                },
                { status: 400 }
            );
        }

        const product = await Product.create(body);
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        console.error("Error in POST /api/products:", errorMessage);
        return NextResponse.json(
            { error: errorMessage || "Error creating product" },
            { status: 500 }
        );
    }
}
