import Link from "next/link";
import Image from "next/image";
import { Article } from "@/model/articles";
import { format } from "date-fns";

const CardArticle = ({ article }: { article: Article }) => {
  return (
    <div className="w-[359px] h-[243px] rounded-[20px] overflow-hidden relative group">
      {/* Gambar dan overlay */}
      <Image
        src={article.thumbnail}
        alt={article.title}
        fill
        className="object-cover grayscale hover:grayscale-0 transition-all"
        priority={false}
      />
      <div className="bg-[#00000060] w-full h-full absolute top-0 left-0 z-10"></div>
      {/* Konten di atas overlay */}
      <div className="w-full h-full absolute p-5 z-20 flex flex-col justify-between">
        <div>
          <h1 className="text-gray-300 text-sm">
            {format(new Date(article.date), "MMM d, yyyy")}
          </h1>
          <h1 className="text-white text-[25px] leading-8 font-bold line-clamp-2">
            {article.title}
          </h1>
        </div>
        <div className="flex justify-end">
          <Link
            href={`/article/${article.slug}`}
            className="p-2 bg-[#a2d812] rounded-lg flex items-center justify-center hover:bg-[#c6f13a] transition"
            aria-label="Lihat detail artikel"
          >
            <span
              className="material-symbols-outlined text-black"
              style={{ fontSize: 24 }}
            >
              north_east
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardArticle;
