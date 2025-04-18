import { NextResponse } from "next/server";
import { insertArticle } from "@/model/articles";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey:
    process.env.IMAGEKIT_PUBLIC_KEY! || "public_H/HIA9KYVzYUxJdG6r8ca2UK9hc=",
  privateKey:
    process.env.IMAGEKIT_PRIVATE_KEY! || "private_SxT+oBqXuorNLMB2OqnoDH/Thaw=",
  urlEndpoint:
    process.env.IMAGEKIT_URL_ENDPOINT! || "https://ik.imagekit.io/q7pvfvakd/",
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const file = formData.get("image") as File;

    if (!title || !content || !author || !file) {
      return NextResponse.json(
        { statusCode: 400, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload ke ImageKit
    const uploaded = await imagekit.upload({
      file: buffer,
      fileName: file.name,
    });

    const imageUrl = uploaded.url;

    const result = await insertArticle({
      title,
      content,
      author,
      image: imageUrl,
    });

    return NextResponse.json(
      {
        statusCode: 201,
        message: "Article created successfully",
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { statusCode: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
