import { NextResponse } from "next/server";
import { getAllArticles, insertArticle } from "@/model/articles";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const author = formData.get("author") as string;
    const category = formData.get("category") as string;
    const slug = formData.get("slug") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const file = formData.get("thumbnail") as File;

    if (!title || !description || !author || !category || !slug || !file) {
      return NextResponse.json(
        { statusCode: 400, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploaded = await imagekit.upload({
      file: buffer,
      fileName: file.name,
    });

    const result = await insertArticle({
      title,
      description,
      author,
      category,
      slug,
      thumbnail: uploaded.url,
      imageUrl: uploaded.url,
      date: new Date().toISOString(),
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

export async function GET() {
  try {
    const articles = await getAllArticles();
    return NextResponse.json({
      statusCode: 200,
      message: "Articles fetched successfully",
      data: articles,
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { statusCode: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
