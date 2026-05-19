import { useState, useEffect, useRef, useCallback, ReactNode } from "react";

/* ────────────────────────────
   CONSTANTS & DATA
   ──────────────────────────── */
const NAV = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Albasia", href: "#albasia" },
  { label: "Tumpang Sari", href: "#tumpangsari" },
  { label: "Galeri", href: "#galeri" },
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
  { icon: "📍", title: "Lahan Strategis", desc: "Lokasi subur dengan iklim dan curah hujan ideal untuk pertumbuhan pohon Albasia." },
  { icon: "💧", title: "Irigasi Alami & Modern", desc: "Kombinasi tata air alami pegunungan dan pengairan terpadu yang konsisten." },
  { icon: "🔬", title: "Bibit Unggul Bersertifikat", desc: "Hanya menggunakan bibit pilihan dengan rekam jejak genetika pertumbuhan terbaik." },
  { icon: "👨‍🌾", title: "Pemberdayaan Petani Lokal", desc: "Dikelola bersama tenaga ahli dan petani lokal berpengalaman asal Pangandaran." },
  { icon: "🤝", title: "Kemitraan & Transparansi", desc: "Sistem pengelolaan profesional, akuntabel, dan mengutamakan hasil panen optimal." },
  { icon: "🛡️", title: "Pengawasan Ketat Terjadwal", desc: "Monitoring berkala dari fase penyemaian, pemeliharaan sela, hingga tebang panen." },
];

const TUMPANG_SARI = [
  ["🌽", "Tanaman Pangan", "Jagung manis, singkong, ubi jalar & aneka kacang-kacangan kaya nitrogen"],
  ["🥬", "Sayuran Hortikultura", "Cabai merah, tomat, terong ungu, kangkung segar & bayam cabut"],
  ["🫚", "Rempah & Empon", "Jahe gajah, kunyit asli, lengkuas & serai wangi pencegah hama alami"],
  ["🍌", "Tanaman Sela Buah", "Pisang cavendish, pepaya california & nanas subur di sela tegakan"],
];

const KONTAK_INFO = [
  ["📞", "Telepon / WhatsApp", "+62 812-XXXX-XXXX"],
  ["✉️", "Email", "cilawangstory@gmail.com"],
  ["📍", "Lokasi Kebun", "Kampung Cilawang, Dusun Cimapag, Desa Harumandala, Kecamatan Cigugur, Kabupaten Pangandaran, Jawa Barat"],
];

const STATS_DATA: { value: string; unit: string; label: string; type: "number" | "static" }[] = [
  { value: "12.000", unit: "m²", label: "Luas Lahan Subur", type: "number" },
  { value: "500+", unit: "", label: "Pohon Albasia", type: "number" },
  { value: "5–7", unit: "tahun", label: "Siklus Panen", type: "static" },
  { value: "8+", unit: "jenis", label: "Komoditas Tumpang Sari", type: "number" },
];

const GALLERY_ITEMS = [
  {
    type: "image" as const,
    src: "/images/hero-wide.jpg",
    thumb: "/images/hero-wide.jpg",
    alt: "Lanskap perkebunan Albasia Aziz Estate di Desa Harumandala",
    title: "Hamparan Lahan Pangandaran",
    desc: "Lahan produktif 12.000 m² dengan tata letak penanaman presisi",
  },
  {
    type: "image" as const,
    src: "/images/albasia-trees.jpg",
    thumb: "/images/albasia-trees.jpg",
    alt: "Pohon Albasia tumbuh tegak lurus di Aziz Estate",
    title: "Tegakan Pohon Albasia",
    desc: "Pohon cepat tumbuh dengan kualitas kayu unggulan bernilai tinggi",
  },
  {
    type: "image" as const,
    src: "/images/tumpang-sari.jpg",
    thumb: "/images/tumpang-sari.jpg",
    alt: "Sistem tumpang sari di sela pohon Albasia",
    title: "Optimalisasi Tumpang Sari",
    desc: "Hortikultura dan tanaman pangan memberi hasil panen sela rutin",
  },
  {
    type: "image" as const,
    src: "/images/hero-plantation.jpg",
    thumb: "/images/hero-plantation.jpg",
    alt: "Proses pengolahan lahan di Aziz Estate Pangandaran",
    title: "Pengolahan Tanah Subur",
    desc: "Perawatan berkala menjaga struktur hara tanah tetap prima",
  },
  {
    type: "image" as const,
    src: "/images/founder-aziz.webp",
    thumb: "/images/founder-aziz.webp",
    alt: "Aziz — Founder di tengah perkebunan",
    title: "Dedikasi Langsung",
    desc: "Founder turun memantau kualitas pertumbuhan setiap bibit",
  },
  {
    type: "image" as const,
    src: "/images/owner-2.webp",
    thumb: "/images/owner-2.webp",
    alt: "Tim ahli agronomi Aziz Estate",
    title: "Pendampingan Ahli",
    desc: "Penerapan ilmu agronomi modern berpadu kearifan lokal",
  },
  {
    type: "youtube" as const,
    videoId: "V4YtYGerDFc",
    title: "Inspeksi Lahan Aziz Estate",
    desc: "Melihat langsung kondisi lahan dan perawatan pohon Albasia di lapangan",
  },
  {
    type: "youtube" as const,
    videoId: "pmo4v3i7Uko",
    title: "Perkembangan Bibit Albasia",
    desc: "Memantau laju pertumbuhan tinggi dan kesehatan daun bibit pohon Albasia secara berkala",
  },
  {
    type: "youtube" as const,
    videoId: "2k_flYN2spo",
    title: "Perawatan & Pembersihan Lahan",
    desc: "Aktivitas pemeliharaan lahan untuk memastikan kelancaran sirkulasi air dan unsur hara tanah",
  },
];

/* ────────────────────────────
   REVEAL ANIMATION WRAPPER
   ──────────────────────────── */
function Reveal({ children, delay = 0, direction = "up" }: { children: ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  let transformInitial = "translate-y-10";
  if (direction === "left") transformInitial = "-translate-x-10";
  if (direction === "right") transformInitial = "translate-x-10";
  if (direction === "none") transformInitial = "scale-95";

  const transformFinal = direction === "none" ? "scale-100" : "translate-y-0 translate-x-0";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        inView ? `opacity-100 ${transformFinal}` : `opacity-0 ${transformInitial}`
      }`}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────
   HOOKS
   ──────────────────────────── */
function useScrollTop(threshold = 30) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const cb = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", cb, { passive: true });
    return () => window.removeEventListener("scroll", cb);
  }, [threshold]);
  return scrolled;
}

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

/* ────────────────────────────
   MAIN APP
   ──────────────────────────── */
export default function App() {
  const scrolled = useScrollTop(40);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div className="min-h-screen scroll-smooth bg-[#f9f8f4] font-sans text-[#1c1915] antialiased selection:bg-emerald-200/60 selection:text-emerald-950 overflow-x-hidden">
      <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <HeroSection />
        <TentangSection />
        <AlbasiaSection />
        <TumpangSariSection />
        <GaleriSection />
        <KeunggulanSection />
        <StatsSection />
        <KontakSection />
      </main>
      <FooterSection />
    </div>
  );
}

/* ────────────────────────────
   NAVBAR (REFINED FLOATING PILL)
   ──────────────────────────── */
function Navbar({ scrolled, menuOpen, setMenuOpen }: { scrolled: boolean; menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <header
      role="banner"
      className={`fixed inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "top-3 md:top-4 mx-4 md:mx-auto max-w-[1140px] rounded-full border border-stone-200/80 bg-white/90 backdrop-blur-xl shadow-lg shadow-black/[0.04] py-1.5"
          : "top-0 mx-0 max-w-none rounded-none border-transparent bg-gradient-to-b from-black/60 to-transparent py-4"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <a href="#beranda" aria-label="Aziz Estate — Beranda" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-xs font-extrabold text-white shadow-md shadow-emerald-900/20 transition-transform duration-300 group-hover:scale-110">
            A
          </span>
          <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${scrolled ? "text-[#1c1915]" : "text-white"}`}>
            Aziz<span className="font-light text-emerald-500">Estate</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1.5 md:flex">
          {NAV.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 hover:scale-105 ${
                scrolled
                  ? "text-stone-700 hover:bg-emerald-50 hover:text-emerald-700"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontak"
            className="ml-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-emerald-700/20 transition-all duration-300 hover:scale-105 hover:from-emerald-500 hover:to-emerald-600 hover:shadow-lg active:scale-95"
          >
            Hubungi Kami
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          className={`md:hidden rounded-full p-2 transition-colors ${scrolled ? "text-stone-800 hover:bg-stone-100" : "text-white hover:bg-white/10"}`}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`overflow-hidden transition-all duration-500 md:hidden ${menuOpen ? "max-h-[500px] border-t border-stone-200/60 bg-white/95 backdrop-blur-2xl mt-3 rounded-2xl mx-2 shadow-2xl shadow-black/10" : "max-h-0"}`}>
        <nav aria-label="Menu mobile" className="space-y-1 p-5">
          {NAV.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3.5 text-[15px] font-medium text-stone-800 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontak"
            onClick={() => setMenuOpen(false)}
            className="mt-4 block rounded-full bg-emerald-600 px-6 py-3.5 text-center text-[15px] font-semibold text-white shadow-lg shadow-emerald-600/20"
          >
            Hubungi Kami
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ────────────────────────────
   HERO SECTION (ELEGANT DUAL PORTRAIT)
   ──────────────────────────── */
function HeroSection() {
  return (
    <section id="beranda" aria-label="Beranda — Aziz Estate" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#0a0a09]">
      {/* Background with Albasia & Ambient Glow */}
      <div className="absolute inset-0 z-0">
        <img src="/images/hero-wide.jpg" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-45 scale-105 transform transition-transform duration-10000" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a09]/95 via-[#0a0a09]/75 to-[#0a0a09]/30" />
        {/* Animated ambient radial glows */}
        <div className="absolute -right-32 top-10 h-[600px] w-[600px] rounded-full bg-emerald-500/[0.05] blur-[140px] animate-pulse-glow" />
        <div className="absolute -bottom-40 left-10 h-[500px] w-[500px] rounded-full bg-emerald-600/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* ===== LEFT: TEXT CONTENT ===== */}
          <div className="lg:col-span-7 xl:col-span-7">
            <Reveal direction="up" delay={100}>
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-4.5 py-2 backdrop-blur-xl shadow-lg shadow-emerald-500/5">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400 absolute" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300 sm:text-[12px]">
                  Agroforestri Modern Pangandaran
                </span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={250}>
              <h1 className="mb-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl">
                Aziz<br />
                <span className="font-light italic text-gradient bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-200 bg-clip-text text-transparent">
                  Estate
                </span>
              </h1>
            </Reveal>

            <Reveal direction="up" delay={400}>
              <div className="mb-5 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent" />
              <p className="mb-4 max-w-xl text-[17px] leading-relaxed text-stone-200 sm:text-[19px] md:text-xl">
                Perkebunan kayu Albasia bernilai tinggi dipadukan dengan tata kelola tumpang sari terpadu di lahan subur{" "}
                <strong className="font-semibold text-emerald-300">12.000 m²</strong>.
              </p>
              <p className="mb-10 max-w-lg text-[15px] leading-relaxed text-stone-400 sm:text-base">
                Membangun warisan hijau berkelanjutan dari Desa Harumandala, Pangandaran untuk masa depan Indonesia.
              </p>
            </Reveal>

            <Reveal direction="up" delay={550}>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#tentang"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-[14px] font-bold text-stone-950 shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:scale-105 hover:from-emerald-400 hover:to-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/30 active:scale-95"
                >
                  Jelajahi Kebun
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-stone-950/15 transition-transform duration-300 group-hover:translate-x-1">
                    <svg className="h-3.5 w-3.5 text-stone-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
                <a
                  href="#kontak"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-8 py-4 text-[14px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/[0.1] active:scale-95"
                >
                  Hubungi Kami
                </a>
              </div>
            </Reveal>

            {/* Hero Quick Stats */}
            <Reveal direction="up" delay={700}>
              <div className="mt-14 flex flex-wrap items-center gap-6 sm:gap-10 border-t border-white/10 pt-8">
                {[
                  { val: "12.000", unit: "m²", label: "Luas Lahan" },
                  { val: "500+", unit: "Pohon", label: "Tegakan Albasia" },
                  { val: "5–7", unit: "Tahun", label: "Masa Panen" },
                ].map(({ val, unit, label }, i) => (
                  <div key={i} className="flex items-baseline gap-2">
                    <div>
                      <div className="text-[26px] font-black leading-none text-white sm:text-[32px]">{val}</div>
                      <div className="text-[13px] font-light text-emerald-400 sm:text-[14px]">{unit}</div>
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-stone-400 border-l border-white/10 pl-3 ml-1 hidden sm:inline-block">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ===== RIGHT: DUAL PORTRAIT COMPOSITION ===== */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
            <Reveal direction="none" delay={300}>
              <div className="relative h-[440px] w-[340px] sm:h-[500px] sm:w-[400px] md:h-[550px] md:w-[440px]">
                
                {/* Decorative concentric circles */}
                <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10 bg-emerald-500/[0.02] backdrop-blur-xs sm:h-[380px] sm:w-[380px] md:h-[460px] md:w-[460px]" />
                <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05] sm:h-[260px] sm:w-[260px]" />

                {/* Back Card: Founder Aziz (Bottom Right) */}
                <div className="absolute bottom-0 right-0 z-10 w-[210px] sm:w-[250px] md:w-[280px]">
                  <div className="group relative overflow-hidden rounded-3xl border-2 border-white/20 bg-stone-900 shadow-2xl shadow-black/80 transition-all duration-500 hover:scale-[1.03] hover:border-emerald-400/50 hover:shadow-emerald-950/50">
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-transparent opacity-60 blur-md group-hover:opacity-100" />
                    <img
                      src="/images/founder-aziz.webp"
                      alt="Aziz — Founder & Pemilik Aziz Estate"
                      className="relative z-10 h-[280px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[340px] md:h-[380px]"
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 z-20 rounded-2xl border border-white/15 bg-black/70 px-4 py-3 backdrop-blur-xl shadow-lg">
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-400">Founder</div>
                      <div className="text-base font-bold text-white sm:text-lg">Aziz</div>
                      <div className="text-[11px] text-stone-300">Pemilik & Pengelola Lahan</div>
                    </div>
                  </div>
                </div>

                {/* Front Card: Co-Founder Abas (Top Left, Overlapping) */}
                <div className="absolute top-0 left-0 z-20 w-[180px] sm:w-[220px] md:w-[250px] animate-float">
                  <div className="group relative overflow-hidden rounded-3xl border-[3px] border-white/30 bg-stone-950 shadow-2xl shadow-black/90 transition-all duration-500 hover:scale-[1.04] hover:border-emerald-300">
                    <img
                      src="/images/owner-2.webp"
                      alt="Abas — Co-Founder Aziz Estate, Ahli Agronomi"
                      className="h-[230px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[280px] md:h-[320px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/20 bg-black/80 px-3.5 py-3 backdrop-blur-xl shadow-xl">
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-emerald-300 sm:text-[10px]">Co-Founder</div>
                      <div className="text-[14px] font-bold text-white sm:text-base">Abas</div>
                      <div className="text-[10px] text-stone-300 sm:text-[11px]">Ahli Agronomi</div>
                    </div>
                  </div>
                </div>

                {/* Floating Albasia Specimen Tag */}
                <div className="absolute -bottom-4 left-4 z-30 animate-float-reverse">
                  <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-stone-950/90 px-4 py-3 backdrop-blur-xl shadow-2xl">
                    <span className="text-2xl">🌳</span>
                    <div>
                      <div className="text-[12px] font-bold text-emerald-300">Albasia Unggul</div>
                      <div className="text-[10px] italic text-stone-400">Albizia falcataria</div>
                    </div>
                  </div>
                </div>

              </div>
            </Reveal>
          </div>

        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:block animate-bounce">
        <a href="#tentang" aria-label="Scroll ke bawah" className="flex flex-col items-center gap-1.5 text-white/30 hover:text-white transition-colors">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Jelajahi</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}

/* ────────────────────────────
   TENTANG SECTION (DETAILED & ACCURATE)
   ──────────────────────────── */
function TentangSection() {
  return (
    <section id="tentang" aria-label="Tentang Aziz Estate" className="bg-[#f9f8f4] py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 md:px-8">
        
        <Reveal direction="up">
          <div className="mb-14 sm:mb-20">
            <span className="mb-3 inline-block text-[11px] font-extrabold uppercase tracking-[0.25em] text-emerald-700">
              Tentang Aziz Estate
            </span>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.12] tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
                Warisan hijau dari <span className="text-emerald-700">lahan 12.000 m²</span> di Pangandaran
              </h2>
              <p className="max-w-sm text-[15px] leading-relaxed text-stone-600">
                Mengubah lahan potensial menjadi ekosistem agroforestri produktif berdaya saing tinggi.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <div className="space-y-5 text-[16px] leading-relaxed text-stone-700">
              <p>
                <strong className="font-bold text-stone-900">Aziz Estate</strong> mengelola lahan perkebunan produktif seluas{" "}
                <strong className="font-bold text-emerald-700">12.000 meter persegi</strong> yang berlokasi persis di{" "}
                <strong className="font-bold text-stone-900">Kampung Cilawang, Dusun Cimapag, Desa Harumandala, Kecamatan Cigugur, Kabupaten Pangandaran, Jawa Barat</strong>.
              </p>
              <p>
                Komoditas utama kami adalah pohon kayu <strong className="font-bold text-stone-900">Albasia (Albizia falcataria)</strong> — kayu cepat tumbuh bernilai tinggi yang menjadi tulang punggung industri perkayuan nasional dan ekspor.
              </p>
              <p>
                Guna memaksimalkan kesuburan hara tanah dan efisiensi lahan, kami memadukannya dengan praktik{" "}
                <strong className="font-bold text-stone-900">tumpang sari terpadu</strong>. Di sela-sela barisan bibit Albasia, kami membudidayakan aneka tanaman pangan, hortikultura, dan rempah yang menghasilkan panen sela berkala sebelum panen utama kayu dalam 5 hingga 7 tahun.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-2.5">
                {["Pertanian Berkelanjutan", "Investasi Jangka Panjang", "Ramah Ekosistem", "Pemberdayaan Warga Lokal"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-2 text-[13px] font-bold text-emerald-800 shadow-xs"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="group overflow-hidden rounded-3xl shadow-xl shadow-stone-900/10 aspect-[3/4]">
                <img
                  src="/images/albasia-trees.jpg"
                  alt="Barisan pohon Albasia di perkebunan Aziz Estate Pangandaran"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="group overflow-hidden rounded-3xl shadow-xl shadow-stone-900/10 aspect-square">
                  <img
                    src="/images/tumpang-sari.jpg"
                    alt="Sistem tumpang sari subur di Aziz Estate"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 items-center justify-center rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 p-6 shadow-xl text-center text-white">
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">12.000</div>
                    <div className="mt-1 text-[12px] sm:text-[13px] uppercase tracking-wider text-stone-400 font-medium">Meter Persegi Lahan</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

/* ────────────────────────────
   ALBASIA SECTION
   ──────────────────────────── */
function AlbasiaSection() {
  return (
    <section id="albasia" aria-label="Pohon Albasia — Komoditas Utama" className="bg-[#12110f] text-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 md:px-8">
        
        <Reveal direction="up">
          <div className="mb-16 sm:mb-20">
            <span className="mb-3 inline-block text-[11px] font-extrabold uppercase tracking-[0.25em] text-emerald-400">
              Komoditas Andalan
            </span>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
                Pohon Kayu Albasia<br />
                <span className="font-light italic text-emerald-400">Si Emas Hijau Serbaguna</span>
              </h2>
              <p className="max-w-md text-[15px] leading-relaxed text-stone-400">
                Albizia falcataria tumbuh super cepat dan memiliki permintaan industri perkayuan yang sangat stabil di pasar domestik maupun ekspor.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ALBASIA.map((c, i) => (
            <Reveal key={i} direction="up" delay={i * 75}>
              <article className="group h-full flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-emerald-950/50">
                <div>
                  <span className="inline-block rounded-lg bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                    {c.tag}
                  </span>
                  <div className="my-5 text-4xl transition-transform duration-300 group-hover:scale-110">
                    {c.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-[14px] leading-relaxed text-stone-400">{c.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ────────────────────────────
   TUMPANG SARI SECTION
   ──────────────────────────── */
function TumpangSariSection() {
  return (
    <section id="tumpangsari" aria-label="Sistem Tumpang Sari Terpadu" className="bg-[#f9f8f4] py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          <Reveal direction="left">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl shadow-stone-900/15 aspect-[4/5]">
                <img
                  src="/images/tumpang-sari.jpg"
                  alt="Sistem tumpang sari terpadu di sela pohon Albasia"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-3xl border border-white bg-white p-6 shadow-2xl">
                <div className="text-3xl">🌾</div>
                <div className="mt-1 font-bold text-stone-900 text-[15px]">Panen Sela Berkala</div>
                <div className="text-[12px] text-stone-500">Menjaga siklus kas & hara tanah</div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div>
              <span className="mb-3 inline-block text-[11px] font-extrabold uppercase tracking-[0.25em] text-emerald-700">
                Sistem Tumpang Sari
              </span>
              <h2 className="mb-6 text-3xl font-extrabold leading-[1.12] tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
                Maksimalkan produktivitas, <span className="text-emerald-700">panen tanpa henti</span>
              </h2>
              <p className="mb-8 text-[16px] leading-relaxed text-stone-600">
                Menunggu masa panen kayu 5 tahun bukan berarti lahan menganggur. Di sela barisan tegakan Albasia muda, kami mengelola beragam tanaman palawija dan sayuran yang memperkaya nutrisi tanah sekaligus memberikan pendapatan rutin.
              </p>

              <div className="space-y-4">
                {TUMPANG_SARI.map(([icon, title, desc], i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs transition-all hover:border-emerald-300 hover:shadow-md"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl shadow-xs">
                      {icon}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-stone-900">{title}</h4>
                      <p className="mt-1 text-[13px] leading-relaxed text-stone-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────
   GALERI SECTION
   ──────────────────────────── */
function GaleriSection() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeYoutube, setActiveYoutube] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const imageItems = GALLERY_ITEMS.filter((g) => g.type === "image");
  const youtubeItems = GALLERY_ITEMS.filter((g) => g.type === "youtube");

  return (
    <section id="galeri" aria-label="Galeri & Video Perjalanan Aziz Estate" className="bg-white py-24 sm:py-32 border-t border-stone-200/60">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 md:px-8">
        
        <Reveal direction="up">
          <div className="mb-16 text-center sm:mb-20">
            <span className="mb-3 inline-block text-[11px] font-extrabold uppercase tracking-[0.25em] text-emerald-700">
              Dokumentasi & Galeri
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
              Melihat Lebih Dekat <span className="text-emerald-700">Hijau nya Kebun Kami</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-stone-600">
              Dari tahap pengolahan tanah subur Harumandala Pangandaran hingga perawatan tegakan pohon Albasia bernilai tinggi.
            </p>
          </div>
        </Reveal>

        {/* Photo Grid */}
        <div className="mb-16 sm:mb-20">
          <Reveal direction="up">
            <h3 className="mb-6 text-xl font-bold text-stone-900 flex items-center gap-2">
              <span>📸</span> Rekam Jejak Visual Perkebunan
            </h3>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {imageItems.map((item, i) => (
              <Reveal key={i} direction="up" delay={i * 75}>
                <button
                  onClick={() => setLightbox(item.src)}
                  className="group relative w-full aspect-[4/3] overflow-hidden rounded-3xl bg-stone-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
                >
                  <img src={item.thumb} alt={item.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-left translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 text-white">
                    <div className="text-lg font-bold">{item.title}</div>
                    <div className="mt-1 text-[13px] text-stone-300">{item.desc}</div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {/* YouTube Embeds */}
        <div>
          <Reveal direction="up">
            <h3 className="mb-6 text-xl font-bold text-stone-900 flex items-center gap-2">
              <span>🎥</span> Video Edukasi & Pengolahan Lahan
            </h3>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {youtubeItems.map((item, i) => (
              <Reveal key={i} direction="up" delay={i * 100}>
                <div className="overflow-hidden rounded-3xl border border-stone-200/80 bg-[#f9f8f4] shadow-md transition-all duration-300 hover:shadow-xl">
                  {activeYoutube === item.videoId ? (
                    <div className="aspect-video w-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0`}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full border-0"
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveYoutube(item.videoId)}
                      className="group relative aspect-video w-full overflow-hidden bg-stone-900 focus:outline-none"
                    >
                      <img src="/images/hero-wide.jpg" alt={item.title} className="h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl transition-transform duration-300 group-hover:scale-125 text-2xl">
                          ▶
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-left text-white">
                        <div className="text-lg font-bold">{item.title}</div>
                        <div className="text-[13px] text-emerald-300">Klik untuk memutar video</div>
                      </div>
                    </button>
                  )}
                  <div className="p-6">
                    <h4 className="text-base font-bold text-stone-900">{item.title}</h4>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-stone-600">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 rounded-full bg-white/10 p-3 text-white backdrop-blur-xl transition-colors hover:bg-white/25 sm:top-8 sm:right-8"
            aria-label="Tutup foto"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightbox}
            alt="Galeri Pembesaran"
            className="max-h-[90vh] max-w-[90vw] rounded-3xl object-contain shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

/* ────────────────────────────
   KEUNGGULAN SECTION
   ──────────────────────────── */
function KeunggulanSection() {
  return (
    <section aria-label="Standar Keunggulan Aziz Estate" className="bg-[#f9f8f4] py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 md:px-8">
        
        <Reveal direction="up">
          <div className="mb-16 text-center sm:mb-20">
            <span className="mb-3 inline-block text-[11px] font-extrabold uppercase tracking-[0.25em] text-emerald-700">
              Mengapa Memilih Kami
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
              Standar Pengelolaan <span className="text-emerald-700">Tanpa Kompromi</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {KEUNGGULAN.map((item, i) => (
            <Reveal key={i} direction="up" delay={i * 75}>
              <article className="group h-full rounded-3xl border border-stone-200/80 bg-white p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-700 transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16 sm:text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-[14px] leading-relaxed text-stone-600">{item.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ────────────────────────────
   STATS ANIMATED SECTION
   ──────────────────────────── */
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section ref={ref} aria-label="Statistik Utama Kebun" className="relative overflow-hidden bg-stone-950 text-white py-20 sm:py-28">
      <div aria-hidden="true" className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[130px]" />
      <div aria-hidden="true" className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-emerald-600/10 blur-[100px]" />
      
      <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-6 md:px-8">
        <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4 border-y border-white/10 py-12 backdrop-blur-xs">
          {STATS_DATA.map((stat, i) => (
            <Reveal key={i} direction="up" delay={i * 100}>
              <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-1.5 font-black">
                  {stat.type === "number" ? (
                    <AnimatedCounter end={parseInt(stat.value.replace(/\D/g, ""))} active={inView} />
                  ) : (
                    <span className="text-5xl tracking-tight sm:text-6xl md:text-7xl">{stat.value}</span>
                  )}
                  <span className="text-2xl font-light text-emerald-400 sm:text-3xl">{stat.unit}</span>
                </div>
                <div className="mt-2 text-[12px] font-bold uppercase tracking-[0.2em] text-stone-400 sm:text-[13px]">
                  {stat.label}
                </div>
              </div>
            </Reveal>
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
    const dur = 2000;
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

  return <span className="text-5xl tracking-tight sm:text-6xl md:text-7xl">{val.toLocaleString("id-ID")}</span>;
}

/* ────────────────────────────
   KONTAK SECTION (REAL EMAIL SUBMIT)
   ──────────────────────────── */
function KontakSection() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setSending(true);
    setError("");

    try {
      const res = await fetch("https://formsubmit.co/ajax/cilawangstory@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
          email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
          message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value,
          _subject: "Pesan Baru dari Website Aziz Estate",
          _captcha: "false",
        }),
      });

      if (res.ok) {
        setSent(true);
        form.reset();
        setTimeout(() => setSent(false), 5000);
      } else {
        setError("Gagal mengirim. Silakan periksa kembali koneksi Anda.");
      }
    } catch {
      setError("Gagal terhubung ke peladen pengirim email. Silakan coba lagi.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <section id="kontak" aria-label="Hubungi Kebun Aziz Estate" className="bg-[#f9f8f4] py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 md:px-8">
        
        <Reveal direction="up">
          <div className="overflow-hidden rounded-3xl bg-stone-900 text-white shadow-2xl">
            <div className="grid lg:grid-cols-12">
              
              {/* Kontak info */}
              <div className="p-8 sm:p-12 md:p-16 lg:col-span-6 flex flex-col justify-center">
                <span className="mb-3 inline-block text-[11px] font-extrabold uppercase tracking-[0.25em] text-emerald-400">
                  Hubungi Pengelola
                </span>
                <h2 className="mb-4 text-3xl font-extrabold leading-[1.12] sm:text-4xl">
                  Siap Berinvestasi di <span className="text-emerald-400">Masa Depan Hijau</span>?
                </h2>
                <p className="mb-10 text-[15px] leading-relaxed text-stone-400">
                  Kami membuka pintu seluas-luasnya untuk diskusi kemitraan, kunjungan langsung ke lokasi lahan Pangandaran, maupun konsultasi agroforestri.
                </p>

                <div className="space-y-6">
                  {KONTAK_INFO.map(([icon, label, value], i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-xl shadow-xs">
                        {icon}
                      </span>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-stone-400 font-bold">{label}</div>
                        <div className="mt-0.5 text-[15px] font-medium text-white leading-relaxed">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form submit */}
              <div className="border-t border-white/10 bg-white/[0.03] p-8 sm:p-12 md:p-16 lg:col-span-6 lg:border-t-0 lg:border-l flex flex-col justify-center">
                <h3 className="mb-8 text-2xl font-bold text-white">Kirim Pesan Langsung</h3>
                
                {sent ? (
                  <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center backdrop-blur-md">
                    <span className="text-5xl">✅</span>
                    <p className="mt-4 text-xl font-bold text-white">Pesan Berhasil Terkirim!</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-stone-300">
                      Terima kasih atas pesan Anda. Tim pengelola Aziz Estate akan merespon ke email Anda secepatnya.
                    </p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="sr-only">Nama Lengkap</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        placeholder="Nama Lengkap"
                        className="w-full rounded-2xl border border-white/15 bg-white/[0.05] p-4 text-[15px] text-white placeholder-stone-400 focus:border-emerald-400 focus:bg-white/[0.08] focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">Alamat Email</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        placeholder="Alamat Email"
                        className="w-full rounded-2xl border border-white/15 bg-white/[0.05] p-4 text-[15px] text-white placeholder-stone-400 focus:border-emerald-400 focus:bg-white/[0.08] focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="sr-only">Tulis Pesan</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Tulis pesan, pertanyaan, atau permohonan kunjungan..."
                        className="w-full resize-none rounded-2xl border border-white/15 bg-white/[0.05] p-4 text-[15px] text-white placeholder-stone-400 focus:border-emerald-400 focus:bg-white/[0.08] focus:outline-none transition-all"
                      />
                    </div>
                    {error && <p className="text-[14px] text-red-400 font-medium">{error}</p>}
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-4 text-[15px] font-bold text-stone-950 shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.01] hover:from-emerald-400 hover:to-emerald-500 active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? "Mengirim Pesan..." : "Kirim Pesan ✉️"}
                    </button>
                  </form>
                )}

              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ────────────────────────────
   FOOTER SECTION
   ──────────────────────────── */
function FooterSection() {
  return (
    <footer role="contentinfo" className="border-t border-stone-200/80 bg-white py-16">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 md:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          
          <div className="max-w-md">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-xs font-black text-emerald-400 shadow-md">
                A
              </span>
              <span className="text-xl font-bold tracking-tight text-stone-900">
                Aziz<span className="font-light text-emerald-600">Estate</span>
              </span>
            </div>
            <p className="text-[14px] leading-relaxed text-stone-600">
              Perkebunan kayu Albasia & tumpang sari terpadu di Kampung Cilawang, Dusun Cimapag, Harumandala, Pangandaran. Berkomitmen pada kelestarian alam dan hasil panen berkualitas tinggi.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-16">
            <div>
              <h4 className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.25em] text-stone-400">
                Peta Situs
              </h4>
              <nav aria-label="Footer navigasi">
                <ul className="space-y-2.5 font-medium">
                  {NAV.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-[14px] text-stone-600 transition-colors hover:text-emerald-700">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div>
              <h4 className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.25em] text-stone-400">
                Ikuti Sosial Kami
              </h4>
              <div className="flex gap-2.5">
                {["📘", "📷", "🐦", "▶️"].map((icon, i) => (
                  <span
                    key={i}
                    role="button"
                    tabIndex={0}
                    aria-label={`Tautan sosial ${i + 1}`}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-stone-100 text-base transition-all hover:bg-stone-900 hover:text-white shadow-2xs hover:scale-110"
                  >
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="mt-16 border-t border-stone-200/80 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[13px] text-stone-500 gap-4 font-medium">
          <div>
            © {new Date().getFullYear()} Aziz Estate — Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div>
            🌳 Tumbuh Lestari Bersama Alam Pangandaran, Jawa Barat.
          </div>
        </div>
      </div>
    </footer>
  );
}
