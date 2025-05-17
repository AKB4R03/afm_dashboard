import { NextResponse } from "next/server";
import { getArticleBySlug } from "@/model/articles";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params; // <-- params harus di-await

  try {
    const article = await getArticleBySlug(slug);

    if (!article) {
      return NextResponse.json(
        { statusCode: 404, message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      statusCode: 200,
      message: "Article fetched successfully",
      data: article,
    });
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    return NextResponse.json(
      { statusCode: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
