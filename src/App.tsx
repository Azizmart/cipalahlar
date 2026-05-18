import { useState, useEffect, useRef, useCallback } from "react";

/* ────────────────────────────
   CONSTANTS
   ──────────────────────────── */
const NAV = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Albasia", href: "#albasia" },
  { label: "Tumpang Sari", href: "#tumpangsari" },
  { label: "Kontak", href: "#kontak" },
];

const ALBASIA = [
  { icon: "⚡", tag: "Kecepatan", title: "Tumbuh Cepat", desc: "Panen dalam 5–7 tahun — jauh lebih cepat dibanding kayu keras konvensional." },
  { icon: "📈", tag: "Ekonomi", title: "Nilai Jual Tinggi", desc: "Pasar domestik & ekspor stabil, harga kompetitif untuk industri kayu olahan." },
  { icon: "🌿", tag: "Budidaya", title: "Mudah Dikelola", desc: "Adaptif terhadap iklim tropis Indonesia, minim perawatan intensif." },
  { icon: "🪵", tag: "Fungsi", title: "Serbaguna", desc: "Kayu lapis, mebel, konstruksi ringan, peti kemas — satu pohon banyak manfaat." },
  { icon: "🌍", tag: "Lingkungan", title: "Penyerap Karbon", desc: "Berkontribusi nyata mengurangi emisi karbon & menjaga keseimbangan iklim." },
  { icon: "💎", tag: "Investasi", title: "ROI Menjanjikan", desc: "Manajemen tepat memberikan imbal hasil berlipat saat masa panen tiba." },
];

const KEUNGGULAN = [
  { icon: "📍", title: "Lahan Strategis", desc: "Akses mudah, tanah subur, iklim ideal — fondasi sempurna untuk pertumbuhan Albasia." },
  { icon: "💧", title: "Irigasi Modern", desc: "Pengairan terpadu memastikan nutrisi air konsisten di setiap musim tanam." },
  { icon: "🔬", title: "Bibit Unggul", desc: "Bibit Albasia bersertifikasi dengan rekam jejak pertumbuhan terbukti." },
  { icon: "👨‍🌾", title: "Tenaga Ahli", desc: "Dikelola praktisi agroforestri berpengalaman, memahami siklus tanam hingga panen." },
  { icon: "🤝", title: "Kemitraan Terbuka", desc: "Investasi transparan dengan sistem bagi hasil yang adil dan profesional." },
  { icon: "🛡️", title: "Garansi Kualitas", desc: "Setiap tahap — dari pembibitan hingga panen — diawasi secara ketat." },
];

const TUMPANG_SARI = [
  ["🌽", "Tanaman Pangan", "Jagung, singkong, ubi jalar & kacang-kacangan"],
  ["🥬", "Sayuran Segar", "Cabai, tomat, terong, kangkung & bayam"],
  ["🫚", "Tanaman Rempah", "Jahe, kunyit, lengkuas & serai wangi"],
  ["🍌", "Buah-buahan", "Pepaya, pisang & nanas sebagai tanaman sela"],
];

const KONTAK_INFO = [
  ["📞", "Telepon / WhatsApp", "+62 812-XXXX-XXXX"],
  ["✉️", "Email", "cilawangstory@gmail.com"],
  ["📍", "Lokasi Kebun", "Jawa Barat — Indonesia"],
];

/* ───────────────────── */
export default function App() {
  const scrolled = useScrollTop(40);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div className="min-h-screen scroll-smooth bg-[#f9f8f4] font-sans text-[#1c1915] antialiased selection:bg-emerald-200/50">
      <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <HeroSection />
        <TentangSection />
        <AlbasiaSection />
        <TumpangSariSection />
        <KeunggulanSection />
        <StatsSection />
        <KontakSection />
      </main>
      <FooterSection />
    </div>
  );
}

/* ───────────────────── HOOKS ───────────────────── */
function useScrollTop(t = 30) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const cb = () => setS(window.scrollY > t);
    window.addEventListener("scroll", cb, { passive: true });
    return () => window.removeEventListener("scroll", cb);
  }, [t]);
  return s;
}

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); obs.disconnect(); }
    }, { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return v;
}

/* ───────────────────── NAVBAR ───────────────────── */
function Navbar({ scrolled, menuOpen, setMenuOpen }: { scrolled: boolean; menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-stone-200/60 bg-[#f9f8f4]/90 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[64px] max-w-[1240px] items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Logo */}
        <a
          href="#beranda"
          aria-label="Aziz Estate — Beranda"
          className="group flex items-center gap-2.5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1c1915] text-xs font-bold text-emerald-400 shadow-sm transition group-hover:scale-105">
            A
          </span>
          <span
            className={`text-lg font-semibold tracking-tight transition-colors ${
              scrolled ? "text-[#1c1915]" : "text-white"
            }`}
          >
            Aziz<span className="font-light text-emerald-500">Estate</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {NAV.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-300 hover:bg-[#1c1915]/6 ${
                scrolled ? "text-stone-600" : "text-white/80 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontak"
            className="ml-3 rounded-full bg-[#1c1915] px-6 py-2.5 text-[13px] font-semibold text-emerald-50 shadow-md shadow-black/10 transition-all hover:bg-[#2d2a25] hover:shadow-lg active:scale-95"
          >
            Hubungi Kami
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          className={`md:hidden ${scrolled ? "text-[#1c1915]" : "text-white"}`}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            {menuOpen ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-400 md:hidden ${
          menuOpen
            ? "max-h-[500px] border-b border-stone-200/60 bg-[#f9f8f4]/95 backdrop-blur-xl"
            : "max-h-0"
        }`}
      >
        <nav aria-label="Menu mobile" className="space-y-1 px-4 pb-6 pt-2">
          {NAV.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-3 text-[15px] font-medium text-stone-700 hover:bg-stone-100 hover:text-[#1c1915]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontak"
            onClick={() => setMenuOpen(false)}
            className="mt-3 block rounded-full bg-[#1c1915] px-6 py-3.5 text-center text-[15px] font-semibold text-emerald-50"
          >
            Hubungi Kami
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ───────────────────── HERO ───────────────────── */
function HeroSection() {
  return (
    <section
      id="beranda"
      aria-label="Beranda — Aziz Estate"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#0f0e0c]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-wide.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0e0c]/95 via-[#0f0e0c]/80 to-[#0f0e0c]/40" />
        <div className="absolute -right-32 -top-20 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
        <div className="absolute -bottom-32 right-16 h-[350px] w-[350px] rounded-full bg-emerald-600/[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 pt-20 sm:px-6 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* ===== LEFT — TEXT ===== */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="mb-6 sm:mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-1.5 backdrop-blur-md sm:px-5 sm:py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300 sm:text-[12px] sm:tracking-[0.2em]">
                Agroforestri Berkelanjutan
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-4 text-4xl font-extrabold leading-[0.98] tracking-tight text-white sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Aziz
              <span className="font-light italic text-emerald-400">Estate</span>
            </h1>

            {/* Divider */}
            <div className="mb-4 h-0.5 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-transparent sm:w-20" />

            {/* Description */}
            <p className="mb-2 max-w-md text-[16px] leading-relaxed text-stone-200/90 sm:text-[18px] md:text-lg">
              Perkebunan albasia modern — sistem tumpang sari terpadu di lahan{" "}
              <strong className="font-semibold text-emerald-400">12.000 m²</strong>.
            </p>
            <p className="mb-8 text-[14px] text-stone-400 sm:mb-10 sm:text-[15px]">
              Investasi hijau yang tumbuh bersama waktu. Untuk bumi, untuk masa depan.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#tentang"
                className="group inline-flex items-center gap-2.5 rounded-full bg-emerald-500 px-6 py-3.5 text-[13px] font-semibold text-[#0f0e0c] shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:bg-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/30 active:scale-[0.97] sm:px-8 sm:py-4 sm:text-[14px]"
              >
                Jelajahi Estate
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0f0e0c]/10 transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              <a
                href="#kontak"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3.5 text-[13px] font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:bg-white/[0.08] active:scale-[0.97] sm:px-8 sm:py-4 sm:text-[14px]"
              >
                Hubungi Kami
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap items-center gap-6 sm:mt-14 sm:gap-10">
              {[
                { val: "12.000", unit: "m²", label: "Luas Lahan" },
                { val: "500+", unit: "", label: "Bibit" },
                { val: "5–7", unit: "thn", label: "Panen" },
              ].map(({ val, unit, label }, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <div>
                    <div className="text-[24px] font-bold leading-none text-white sm:text-[28px]">{val}</div>
                    <div className="text-[14px] font-light text-emerald-300/60 sm:text-[16px]">{unit}</div>
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-500">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ===== RIGHT — 2 PORTRAITS ===== */}
          <div className="relative flex justify-center lg:justify-end">
                                    <div className="relative h-[420px] w-full max-w-[440px] sm:h-[480px] md:h-[540px] md:max-w-[480px]">
              {/* Decorative circles */}
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04] bg-white/[0.02] backdrop-blur-sm sm:h-[360px] sm:w-[360px] md:h-[440px] md:w-[440px]" />
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] sm:h-[260px] sm:w-[260px] md:h-[320px] md:w-[320px]" />

              {/* Photo 1 — Bawah/Belakang (Founder Aziz) — foto dasar, lebih besar */}
              <figure className="group absolute bottom-0 left-0 z-10 md:left-2">
                <div className="relative h-[280px] w-[200px] overflow-hidden rounded-3xl border-2 border-white/[0.15] shadow-2xl shadow-black/45 transition-all duration-500 hover:scale-[1.02] hover:border-white/25 sm:h-[340px] sm:w-[250px] md:h-[400px] md:w-[290px]">
                  <div aria-hidden="true" className="absolute -inset-[3px] z-0 rounded-[26px] bg-gradient-to-br from-emerald-400/25 to-transparent blur-[2px]" />
                  <img
                    src="/images/founder-aziz.png"
                    alt="Aziz — Founder & Pemilik Aziz Estate"
                    className="relative z-[1] h-full w-full rounded-3xl object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0f0e0c]/50 via-[#0f0e0c]/5 to-transparent" />
                  <figcaption className="absolute bottom-3 left-3 right-3 z-[3] rounded-2xl border border-white/[0.18] bg-black/60 px-3 py-2.5 backdrop-blur-xl shadow-lg sm:bottom-4 sm:left-4 sm:right-4 sm:px-4 sm:py-3">
                    <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-300 sm:text-[10px]">Founder</div>
                    <div className="mt-0.5 text-[15px] font-bold leading-none text-white sm:text-lg">Aziz M</div>
                    <div className="mt-0.5 text-[10px] leading-tight text-stone-300/80 sm:text-[11px]">Pemilik & Pengembang</div>
                  </figcaption>
                </div>
              </figure>

              {/* Photo 2 — Atas/Depan (Co-Founder Dewi) — numpuk elegan di atas foto Aziz */}
              <figure className="group absolute right-0 top-0 z-20 md:right-0 md:top-2">
                <div className="relative h-[240px] w-[170px] overflow-hidden rounded-3xl border-[3px] border-white/[0.25] shadow-2xl shadow-black/50 transition-all duration-500 hover:scale-[1.03] hover:border-white/40 sm:h-[290px] sm:w-[200px] md:h-[370px] md:w-[260px]">
                  <img
                    src="/images/owner-2.png"
                    alt="Dewi — Co-Founder Aziz Estate, Ahli Agronomi"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c]/45 via-transparent to-transparent" />
                  <figcaption className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/[0.2] bg-black/60 px-3 py-2.5 backdrop-blur-xl shadow-lg sm:bottom-4 sm:left-4 sm:right-4 sm:px-4 sm:py-3">
                    <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-400/90 sm:text-[10px]">Co-Founder</div>
                    <div className="mt-0.5 text-[14px] font-bold leading-none text-white sm:text-base">Abas</div>
                    <div className="mt-0.5 text-[10px] leading-tight text-stone-300/90 sm:text-[11px]">Ahli Agronomi</div>
                  </figcaption>
                </div>
              </figure>

              {/* Floating badge */}
              <div className="absolute -bottom-2 right-1 z-30 rounded-2xl border border-emerald-500/15 bg-[#0f0e0c]/85 px-3 py-2 backdrop-blur-md shadow-lg sm:px-4 sm:py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl">🌳</span>
                  <div>
                    <div className="text-[11px] font-semibold text-emerald-400 sm:text-[12px]">Albasia</div>
                    <div className="text-[9px] text-stone-400 sm:text-[10px]">Albizia falcataria</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce sm:block sm:bottom-8">
        <div className="flex flex-col items-center gap-1.5 text-white/25">
          <span className="text-[9px] uppercase tracking-[0.25em]">Scroll</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── TENTANG ───────────────────── */
function TentangSection() {
  return (
    <section
      id="tentang"
      aria-label="Tentang Aziz Estate"
      className="bg-[#f9f8f4] py-20 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 sm:text-[11px]">
            Tentang Aziz Estate
          </span>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl text-3xl font-bold leading-[1.08] tracking-tight text-[#1c1915] sm:text-4xl md:text-5xl">
              Warisan hijau dari{" "}
              <span className="text-emerald-700">lahan 12.000 m²</span>{" "}
              untuk masa depan
            </h2>
            <p className="max-w-sm text-[14px] leading-relaxed text-stone-500 sm:text-[15px]">
              Dari mimpi sederhana — mengubah lahan menjadi aset produktif berkelanjutan.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="space-y-4 sm:space-y-5">
            <p className="text-[15px] leading-relaxed text-stone-600 sm:text-[16px]">
              <strong className="font-semibold text-[#1c1915]">Aziz Estate</strong>{" "}
              mengelola lahan seluas{" "}
              <strong className="font-semibold text-emerald-700">12.000 meter persegi</strong>{" "}
              dengan fokus budidaya pohon{" "}
              <strong className="font-semibold text-[#1c1915]">Albasia</strong>{" "}
              (Albizia falcataria) — si emas hijau yang tumbuh cepat dan bernilai ekonomi tinggi.
            </p>
            <p className="text-[15px] leading-relaxed text-stone-600 sm:text-[16px]">
              Melalui sistem <strong className="font-semibold text-[#1c1915]">tumpang sari</strong>,
              kami memaksimalkan setiap jengkal lahan — menghasilkan panen berkala sambil menunggu
              masa panen utama Albasia dalam 5–7 tahun.
            </p>
            <p className="text-[15px] leading-relaxed text-stone-600 sm:text-[16px]">
              Investasi terbaik adalah yang tumbuh — untuk bumi, untuk keluarga, untuk generasi mendatang.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {["Berkelanjutan", "Produktif", "Ramah Lingkungan", "Menguntungkan"].map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[12px] font-medium text-emerald-700 sm:px-4 sm:text-[13px]"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/images/albasia-trees.jpg"
                alt="Pohon Albasia di perkebunan Aziz Estate"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div className="aspect-square overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/images/tumpang-sari.jpg"
                  alt="Sistem tumpang sari di Aziz Estate"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <div className="flex flex-1 items-center justify-center rounded-2xl bg-[#1c1915] shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400 sm:text-3xl">12.000</div>
                  <div className="text-[10px] text-stone-400 sm:text-[11px]">meter persegi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── ALBASIA ───────────────────── */
function AlbasiaSection() {
  return (
    <section
      id="albasia"
      aria-label="Pohon Albasia — Komoditas Utama"
      className="bg-[#1c1915] py-20 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 md:px-8">
        <div className="mb-12 sm:mb-16 md:mb-20">
          <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-500 sm:text-[11px]">
            Komoditas Utama
          </span>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
              Pohon Albasia
              <br />
              <span className="font-light italic text-emerald-400">Si Emas Hijau</span>
            </h2>
            <p className="max-w-sm text-[14px] leading-relaxed text-stone-400 sm:text-[15px]">
              Kayu primadona industri nasional — tumbuh cepat, serbaguna, selalu dicari pasar.
            </p>
          </div>
        </div>

        {/* Cards — responsive grid */}
        <div className="grid gap-px overflow-hidden rounded-3xl bg-stone-800 sm:grid-cols-2 md:grid-cols-3">
          {ALBASIA.map((c, i) => (
            <article
              key={i}
              className="group flex flex-col gap-3.5 bg-[#22201d] p-6 transition-colors duration-300 hover:bg-[#292724] sm:p-7 md:p-9"
            >
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-emerald-600 sm:text-[10px]">
                {c.tag}
              </span>
              <span className="text-2xl transition-transform duration-300 group-hover:scale-110 sm:text-3xl">
                {c.icon}
              </span>
              <h3 className="text-[15px] font-semibold text-white sm:text-[17px]">{c.title}</h3>
              <p className="text-[12px] leading-relaxed text-stone-400 sm:text-[13px]">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── TUMPANG SARI ───────────────────── */
function TumpangSariSection() {
  return (
    <section
      id="tumpangsari"
      aria-label="Sistem Tumpang Sari"
      className="bg-[#f9f8f4] py-20 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 md:px-8">
        <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-stone-300/40">
              <img
                src="/images/tumpang-sari.jpg"
                alt="Sistem tumpang sari terpadu di Aziz Estate"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 rounded-2xl border border-stone-100 bg-white px-4 py-3 shadow-xl sm:px-5 sm:py-4">
              <div className="text-xl sm:text-2xl">🌾</div>
              <div className="mt-0.5 text-[11px] font-medium text-stone-600 sm:text-[12px]">Sistem Terpadu</div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 sm:text-[11px]">
              Tumpang Sari
            </span>
            <h2 className="mb-4 text-3xl font-bold leading-[1.08] tracking-tight text-[#1c1915] sm:mb-6 sm:text-4xl md:text-5xl">
              Maksimalkan lahan,{" "}
              <span className="text-emerald-700">panen berkala</span>
            </h2>
            <p className="mb-6 text-[15px] leading-relaxed text-stone-600 sm:mb-8 sm:text-[16px]">
              Di sela pohon Albasia yang tumbuh, kami menanam beragam komoditas pangan &
              hortikultura — memberikan pendapatan rutin sekaligus menjaga kesuburan tanah.
            </p>

            <div className="space-y-2.5 sm:space-y-3">
              {TUMPANG_SARI.map(([icon, title, desc], i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-stone-100 bg-white p-3.5 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md sm:gap-4 sm:p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg sm:h-12 sm:w-12 sm:text-xl">
                    {icon}
                  </span>
                  <div>
                    <h4 className="text-[14px] font-semibold text-[#1c1915] sm:text-base">{title}</h4>
                    <p className="text-[12px] text-stone-400 sm:text-[13px]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── KEUNGGULAN ───────────────────── */
function KeunggulanSection() {
  return (
    <section
      aria-label="Keunggulan Aziz Estate"
      className="bg-white py-20 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 md:px-8">
        <div className="mb-12 text-center sm:mb-16 md:mb-20">
          <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 sm:text-[11px]">
            Mengapa Aziz Estate
          </span>
          <h2 className="text-3xl font-bold leading-[1.08] tracking-tight text-[#1c1915] sm:text-4xl md:text-5xl">
            Standar kualitas{" "}
            <span className="text-emerald-700">tanpa kompromi</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {KEUNGGULAN.map((item, i) => (
            <article
              key={i}
              className="group rounded-2xl border border-stone-100 bg-[#f9f8f4] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50 sm:p-7"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm ring-1 ring-stone-100 transition-transform duration-300 group-hover:scale-110 sm:mb-4 sm:h-12 sm:w-12 sm:text-xl">
                {item.icon}
              </div>
              <h3 className="mb-1.5 text-[15px] font-semibold text-[#1c1915] sm:mb-2 sm:text-[17px]">
                {item.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-stone-500 sm:text-[14px]">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── STATS ───────────────────── */
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section
      ref={ref}
      aria-label="Statistik Aziz Estate"
      className="relative overflow-hidden bg-[#1c1915] py-16 sm:py-20 md:py-28"
    >
      <div aria-hidden="true" className="absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-emerald-500/6 blur-3xl md:h-[500px] md:w-[500px]" />
      <div aria-hidden="true" className="absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full bg-emerald-400/4 blur-3xl md:h-[400px] md:w-[400px]" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 md:px-8">
        <div className="grid gap-8 text-center sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {[
            ["12.000", "m²", "Luas Lahan"],
            ["500+", "", "Bibit Albasia"],
            ["5—7", "tahun", "Masa Panen"],
            ["8+", "jenis", "Tumpang Sari"],
          ].map(([val, unit, label], i) => (
            <div key={i}>
              <div className="mb-1 flex items-baseline justify-center gap-1">
                <AnimatedCounter end={parseInt(val.replace(/\D/g, ""))} active={inView} />
                <span className="text-xl font-light text-emerald-500/40 sm:text-2xl md:text-3xl">{unit}</span>
              </div>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400 sm:text-[13px]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ end, active }: { end: number; active: boolean }) {
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!active || done.current) return;
    done.current = true;
    const dur = 1800;
    const step = Math.max(1, Math.ceil(end / (dur / 20)));
    let cur = 0;
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) {
        setVal(end);
        clearInterval(t);
      } else {
        setVal(cur);
      }
    }, 20);
    return () => clearInterval(t);
  }, [active, end]);

  return (
    <span className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
      {val.toLocaleString("id-ID")}
    </span>
  );
}

/* ───────────────────── KONTAK ───────────────────── */
function KontakSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  }, []);

  return (
    <section
      id="kontak"
      aria-label="Hubungi Aziz Estate"
      className="bg-[#f9f8f4] py-20 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 md:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#1c1915] shadow-2xl shadow-stone-300/30">
          <div className="grid lg:grid-cols-2">
            {/* Info */}
            <div className="flex flex-col justify-center p-8 sm:p-10 md:p-14">
              <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-500 sm:text-[11px]">
                Hubungi Kami
              </span>
              <h2 className="mb-3 text-2xl font-bold leading-[1.12] tracking-tight text-white sm:mb-4 sm:text-3xl md:text-4xl">
                Siap berinvestasi di{" "}
                <span className="text-emerald-400">masa depan</span>?
              </h2>
              <p className="mb-8 text-[14px] leading-relaxed text-stone-400 sm:mb-10 sm:text-[15px]">
                Tim Aziz Estate siap mendiskusikan peluang kerjasama, investasi, atau kunjungan
                langsung ke kebun kami.
              </p>

              <div className="space-y-4 sm:space-y-5">
                {KONTAK_INFO.map(([icon, label, value], i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-base sm:h-11 sm:w-11 sm:text-lg">
                      {icon}
                    </span>
                    <div>
                      <div className="text-[10px] text-stone-500 sm:text-[11px]">{label}</div>
                      <div className="text-[14px] font-medium text-white sm:text-base">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="border-t border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10 md:border-l md:border-t-0 md:p-14">
              <h3 className="mb-6 text-lg font-semibold text-white sm:mb-8 sm:text-xl">Kirim Pesan</h3>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-10 text-center sm:py-12">
                  <span className="text-4xl sm:text-5xl">✅</span>
                  <p className="mt-3 text-lg font-semibold text-white sm:mt-4 sm:text-xl">Pesan Terkirim!</p>
                  <p className="mt-1.5 text-[13px] text-stone-400 sm:mt-2 sm:text-sm">
                    Terima kasih. Kami akan segera merespon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap"
                    aria-label="Nama Lengkap"
                    className="w-full rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-[14px] text-white placeholder-stone-500 outline-none transition-all focus:border-emerald-500/40 focus:bg-white/[0.07] focus:ring-2 focus:ring-emerald-500/10 sm:px-5 sm:py-3.5 sm:text-[15px]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Alamat Email"
                    aria-label="Alamat Email"
                    className="w-full rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-[14px] text-white placeholder-stone-500 outline-none transition-all focus:border-emerald-500/40 focus:bg-white/[0.07] focus:ring-2 focus:ring-emerald-500/10 sm:px-5 sm:py-3.5 sm:text-[15px]"
                  />
                  <textarea
                    rows={4}
                    required
                    placeholder="Tulis pesan Anda..."
                    aria-label="Pesan Anda"
                    className="w-full resize-none rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-[14px] text-white placeholder-stone-500 outline-none transition-all focus:border-emerald-500/40 focus:bg-white/[0.07] focus:ring-2 focus:ring-emerald-500/10 sm:px-5 sm:py-3.5 sm:text-[15px]"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-500 py-3 text-[14px] font-semibold text-[#1c1915] shadow-lg shadow-emerald-500/15 transition-all duration-300 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/25 active:scale-[0.98] sm:py-3.5 sm:text-[15px]"
                  >
                    Kirim Pesan ✉️
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── FOOTER ───────────────────── */
function FooterSection() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-stone-200 bg-white py-12 sm:py-14"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1c1915] text-[11px] font-bold text-emerald-400">
                A
              </span>
              <span className="text-lg font-semibold tracking-tight text-[#1c1915]">
                Aziz<span className="font-light text-emerald-600">Estate</span>
              </span>
            </div>
            <p className="text-[12px] leading-relaxed text-stone-400 sm:text-[13px]">
              Perkebunan albasia & tumpang sari. Membangun warisan hijau untuk generasi
              Indonesia yang lebih baik.
            </p>
          </div>

          {/* Nav + Social */}
          <div className="flex flex-wrap gap-8 sm:gap-12">
            <div>
              <h4 className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-300 sm:text-[11px]">
                Navigasi
              </h4>
              <nav aria-label="Footer navigasi">
                <ul className="space-y-2">
                  {NAV.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[12px] text-stone-500 transition-colors hover:text-emerald-700 sm:text-[13px]"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div>
              <h4 className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-300 sm:text-[11px]">
                Sosial
              </h4>
              <div className="flex gap-2">
                {["📘", "📷", "🐦", "▶️"].map((icon, i) => (
                  <span
                    key={i}
                    role="button"
                    tabIndex={0}
                    aria-label={`Media sosial ${i + 1}`}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-stone-100 text-sm transition-all hover:bg-[#1c1915] hover:text-white"
                  >
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-100 pt-5 text-center text-[11px] text-stone-400 sm:mt-12 sm:pt-6 sm:text-[12px]">
          © {new Date().getFullYear()} Aziz Estate — Tumbuh bersama alam. 🌱
        </div>
      </div>
    </footer>
  );
}
