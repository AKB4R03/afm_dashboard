// components/Navbar.jsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ darkText = false }: { darkText?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper for text color
  const navText = darkText && !scrolled ? "text-black" : "text-white";
  const borderColor = darkText && !scrolled ? "border-black" : "border-white";
  const svgText = darkText && !scrolled ? "text-black" : "text-white";

  return (
    <>
      <header>
        <nav
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled ? "bg-[#0c2000] shadow-md" : "bg-transparent"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <Link
                href="https://afm-website-gilt.vercel.app/index.html"
                className={`flex items-center text-lg font-medium ${navText}`}
              >
                <Image
                  src="/assets/img/logo-ppm.png"
                  alt="Logo"
                  width={30}
                  height={24}
                  className="mr-2"
                />
                <span>PPM Al-Faqih Mandiri</span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-6">
                <Link
                  href="https://afm-website-gilt.vercel.app/index.html"
                  className={`text-sm px-4 py-2 rounded-md transition-colors hover:bg-[#a2d812] hover:text-black ${navText} ${
                    pathname ===
                    "https://afm-website-gilt.vercel.app/index.html"
                      ? "bg-[#a2d812] text-black"
                      : ""
                  }`}
                >
                  Beranda
                </Link>
                <Link
                  href="https://afm-website-gilt.vercel.app/about.html"
                  className={`text-sm px-4 py-2 rounded-md transition-colors hover:bg-[#a2d812] hover:text-black ${navText} ${
                    pathname ===
                    "https://afm-website-gilt.vercel.app/about.html"
                      ? "bg-[#a2d812] text-black"
                      : ""
                  }`}
                >
                  Tentang AFM
                </Link>

                {/* Dropdown */}
                <div className="relative group">
                  <button
                    className={`text-sm px-4 py-2 rounded-md transition-colors hover:bg-[#a2d812] hover:text-black flex items-center ${navText}`}
                  >
                    Struktur
                    <svg
                      className={`w-4 h-4 ml-1 ${navText}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white transform scale-0 group-hover:scale-100 transition-transform origin-top">
                    <Link
                      href="https://afm-website-gilt.vercel.app/structure.html"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Struktur Kepengurusan
                    </Link>
                    <hr className="my-1" />
                    <Link
                      href="https://afm-website-gilt.vercel.app/divisions.html"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Divisi di PPM
                    </Link>
                  </div>
                </div>

                <Link
                  href="https://afm-website-gilt.vercel.app/facilities.html"
                  className={`text-sm px-4 py-2 rounded-md transition-colors hover:bg-[#a2d812] hover:text-black ${navText} ${
                    pathname ===
                    "https://afm-website-gilt.vercel.app/facilities.html"
                      ? "bg-[#a2d812] text-black"
                      : ""
                  }`}
                >
                  Fasilitas
                </Link>
                <Link
                  href="http://afm-website-gilt.vercel.app/pendaftaran_santri_baru.html"
                  className={`text-sm px-4 py-2 rounded-md transition-colors hover:bg-[#a2d812] hover:text-black ${navText} ${
                    pathname ===
                    "http://afm-website-gilt.vercel.app/pendaftaran_santri_baru.html"
                      ? "bg-[#a2d812] text-black"
                      : ""
                  }`}
                >
                  Pendaftaran
                </Link>
                <Link
                  href={`${BASE_URL}/article`}
                  className={`text-sm px-4 py-2 rounded-md transition-colors hover:bg-[#a2d812] hover:text-black ${
                    pathname === "/article"
                      ? "bg-[#a2d812] text-black"
                      : navText
                  }`}
                >
                  Article
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className={`lg:hidden border p-2 rounded-md ${borderColor}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className={`w-6 h-6 ${svgText}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-16 6h16"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              className={`lg:hidden bg-[#0c2000] mt-2 rounded-lg p-4 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <div className="flex flex-col space-y-3">
                <Link
                  href="https://afm-website-gilt.vercel.app/index.html"
                  className={`text-sm px-4 py-2 rounded-md transition-colors hover:bg-[#a2d812] hover:text-black ${navText} ${
                    pathname ===
                    "https://afm-website-gilt.vercel.app/index.html"
                      ? "bg-[#a2d812] text-black"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Beranda
                </Link>
                <Link
                  href="https://afm-website-gilt.vercel.app/about.html"
                  className={`text-sm px-4 py-2 rounded-md transition-colors hover:bg-[#a2d812] hover:text-black ${navText} ${
                    pathname ===
                    "https://afm-website-gilt.vercel.app/about.html"
                      ? "bg-[#a2d812] text-black"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Tentang AFM
                </Link>
                <Link
                  href="https://afm-website-gilt.vercel.app/structure.html"
                  className="text-sm px-4 py-2 rounded-md transition-colors hover:bg-[#a2d812] hover:text-black text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Struktur Kepengurusan
                </Link>
                <Link
                  href="https://afm-website-gilt.vercel.app/divisions.html"
                  className="text-sm px-4 py-2 rounded-md transition-colors hover:bg-[#a2d812] hover:text-black text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Divisi di PPM
                </Link>
                <Link
                  href="https://afm-website-gilt.vercel.app/facilities.html"
                  className={`text-sm px-4 py-2 rounded-md transition-colors hover:bg-[#a2d812] hover:text-black ${navText} ${
                    pathname ===
                    "https://afm-website-gilt.vercel.app/facilities.html"
                      ? "bg-[#a2d812] text-black"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Fasilitas
                </Link>
                <Link
                  href="http://afm-website-gilt.vercel.app/pendaftaran_santri_baru.html"
                  className={`text-sm px-4 py-2 rounded-md transition-colors hover:bg-[#a2d812] hover:text-black ${navText} ${
                    pathname ===
                    "http://afm-website-gilt.vercel.app/pendaftaran_santri_baru.html"
                      ? "bg-[#a2d812] text-black"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Pendaftaran
                </Link>
                <Link
                  href={`${BASE_URL}/article`}
                  className={`text-sm px-4 py-2 rounded-md transition-colors hover:bg-[#a2d812] hover:text-black ${navText} ${
                    pathname === "/article" ? "bg-[#a2d812] text-black" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Article
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
