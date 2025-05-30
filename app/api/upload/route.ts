import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) reject(error);
          else resolve(result as { secure_url: string });
        })
        .end(buffer);
    });

    return NextResponse.json({ url: uploadResponse.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}