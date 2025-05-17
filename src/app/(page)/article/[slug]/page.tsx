"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import CardArticle from "@/components/articleCard";

import type { Article } from "@/model/articles";

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [maxCard, setMaxCard] = useState(4);

  // Responsive: atur jumlah card berdasarkan lebar layar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMaxCard(3); // HP
      } else if (window.innerWidth < 1024) {
        setMaxCard(2); // Tablet
      } else {
        setMaxCard(4); // Desktop
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Fetch artikel lain (misal: 3 artikel terbaru, atau semua kecuali slug ini)
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/article");
        const data = await res.json();
        if (data.statusCode === 200) {
          // Filter agar tidak menampilkan artikel yang sedang dibuka
          setArticles(data.data.filter((a: Article) => a.slug !== slug));
        }
      } catch (err) {
        setArticles([]);
        console.log("Error fetching articles:", err);
      }
    };
    fetchArticles();
  }, [slug]);

  const pathname = usePathname();
  // Deteksi jika path mengandung '/article/' dan bukan '/article' (list)
  const isSlugPage = /^\/article\/[^/]+$/.test(pathname);

  useEffect(() => {
    if (!slug) return;
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/article/${slug}`);
        const data = await res.json();
        if (data.statusCode === 200) {
          setArticle(data.data);
        } else {
          setArticle(null);
        }
      } catch (err) {
        setArticle(null);
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-72 bg-gray-200 rounded-lg" />
          <div className="h-6 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-lg text-muted-foreground">Article not found.</p>
        <button
          className="btn-primary mt-4"
          onClick={() => router.push("/article")}
        >
          Back to Articles
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar darkText={isSlugPage} />
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <div className="mb-4">
              <span className="text-xs text-[#a2d812] uppercase tracking-wider">
                {article.category}
              </span>
              <CardTitle className="text-3xl font-bold mt-2 mb-2">
                {article.title}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>By {article.author}</span>
                <span>•</span>
                <span>{format(new Date(article.date), "MMM d, yyyy")}</span>
              </div>
            </div>
            <div className="relative aspect-video mb-6 overflow-hidden rounded-lg">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none text-gray-800">
              <p>{article.description}</p>
              {article.videoUrl && (
                <div className="mt-8">
                  <iframe
                    src={article.videoUrl}
                    title="Video"
                    className="w-full aspect-video rounded-lg"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex w-full flex-col h-[450px] justify-start items-center mb-[5%]">
        <h1 className="text-sm text-[#a2d812]">AFM Article</h1>
        <h1 className="text-[50px] raleway font-medium text-gray-900 -mt-2">
          Article{" "}
        </h1>
        <div className="w-full px-[5%] h-[70%] flex justify-center items-center">
          <div className="flex flex-row w-full px-[5%] h-[70%] justify-center items-center gap-x-4">
            {articles.slice(0, maxCard).map((article) => (
              <CardArticle key={article._id?.toString()} article={article} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
