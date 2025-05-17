"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroStructure from "@/components/heroComponent";
import { Article } from "@/model/articles";
import AOS from "aos";
import Link from "next/link";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      once: true, // animasi hanya sekali
      duration: 700, // durasi animasi
    });
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/article");
        const data = await response.json();
        if (data.statusCode === 200) {
          setArticles(data.data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <HeroStructure />

      {/* Top Article Component */}
      <div
        data-aos="fade-up"
        className="w-full flex flex-col lg:flex-row h-auto lg:h-[340px] mt-[5%] px-4 md:px-[6%] lg:px-[10.5%] justify-center items-center gap-y-8 lg:gap-x-14 animate-fade-up animate-delay-300"
      >
        {/* Left Component */}
        <div className="w-full lg:w-[75%] rounded-lg h-[220px] md:h-[300px] lg:h-full overflow-hidden mb-4 lg:mb-0">
          <img
            src="/assets/img/PPM AFM 1.jpg"
            className="object-cover rounded-lg w-full h-full"
            alt="Ilustrasi Minyak Jelantah"
          />
        </div>

        {/* Right Component */}
        <div className="w-full lg:w-[45%] rounded-lg h-auto flex flex-col">
          <div className="flex flex-col w-full justify-between h-full gap-y-2">
            <div className="flex flex-col gap-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-[40px] font-poppins font-bold leading-tight text-gray-900 underline">
                Mengenal PPM Al-Faqih Mandiri
              </h1>
            </div>
            <p className="text-gray-500 leading-7 text-base md:text-lg">
              PPM Al-Faqih Mandiri (AFM) adalah pesantren modern yang
              berkomitmen membentuk{" "}
              <b className="bg-yellow-500">
                generasi muda berakhlak mulia, berilmu, dan mandiri.
              </b>{" "}
              Dengan kurikulum yang mengintegrasikan pendidikan agama dan umum,
              kami berusaha menciptakan lingkungan belajar yang kondusif.
            </p>
          </div>
        </div>
      </div>

      {/* Article Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-[10%] gap-8 gap-y-10 mt-14 mb-[80px] animate-fade-up animate-delay-700">
        {articles.map((article) => (
          <Link
            key={article._id?.toString()}
            href={`/article/${article?.slug}`}
          >
            <Card
              key={article._id?.toString()}
              className="flex flex-col border-0 shadow-none"
            >
              <CardHeader>
                <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all"
                  />
                </div>
                <p className="text-xs text-[#a2d812]">{article.category}</p>
                <CardTitle className="line-clamp-2 text-2xl">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{article.author}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(article.date), "MMM d, yyyy")}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}

        {articles.length === 0 && (
          <div className="col-span-3 text-center py-12">
            <p className="text-lg text-muted-foreground">No articles found</p>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
