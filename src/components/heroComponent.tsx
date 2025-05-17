const HeroStructure = () => {
  return (
    <section
      className="flex justify-center items-center py-20 text-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/assets/img/PPM AFM 1.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl mb-6 text-white font-bold font-poppins">
            Artikel PPM Al-Faqih Mandiri
          </h1>
          <h2 className="text-xl md:text-2xl text-white font-medium font-poppins">
            Temukan inspirasi, informasi, dan cerita terbaru seputar kegiatan,
            prestasi, serta kehidupan santri di PPM AFM.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default HeroStructure;
