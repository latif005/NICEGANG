import { useEffect, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../services/api";
import GameCard from "../components/GameCard";
import "../App.css";
import {
  MessageCircle,
  Search,
  Zap,
  Shield,
  DollarSign,
  Headphones,
  ChevronDown,
  Mail,
  Phone,
  Clock,
  Gamepad2,
  Globe,
  Send,
  Video,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Monitor,
} from "lucide-react";

// Data FAQ
const faqData = [
  {
    question: "Apa itu TipTopUp?",
    answer:
      "TipTopUp adalah platform top up game online terpercaya di Indonesia. Kami menyediakan layanan pengisian mata uang dalam game seperti Diamond, UC, Genesis Crystal, dan lainnya dengan harga termurah dan proses yang instan.",
  },
  {
    question: "Bagaimana cara top up di TipTopUp?",
    answer:
      "Caranya sangat mudah! Pilih game yang ingin kamu top up, masukkan ID game kamu, pilih nominal top up, lakukan pembayaran, dan diamond/item akan langsung masuk ke akun game kamu secara otomatis.",
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer:
      "Kami menyediakan berbagai metode pembayaran termasuk QRIS, GoPay, DANA, ShopeePay, OVO, Transfer Bank (BCA, BNI, BRI, Mandiri), dan masih banyak lagi. Pilih yang paling nyaman untuk kamu!",
  },
  {
    question: "Apakah proses top up instan?",
    answer:
      "Ya! Setelah pembayaran dikonfirmasi, proses top up berlangsung secara otomatis dan instan. Rata-rata hanya membutuhkan waktu 1-5 menit saja untuk masuk ke akun game kamu.",
  },
  {
    question: "Bagaimana jika top up gagal?",
    answer:
      "Jangan khawatir! Jika top up gagal, uang kamu akan dikembalikan secara otomatis. Kamu juga bisa menghubungi customer support kami melalui WhatsApp untuk bantuan lebih lanjut.",
  },
];

// Data Keunggulan
const advantagesData = [
  {
    icon: <Zap size={32} />,
    title: "Proses Instan & Cepat",
    description:
      "Top up masuk ke akun game kamu dalam hitungan detik. Tidak perlu menunggu lama, langsung main!",
    color: "#f97316",
  },
  {
    icon: <Shield size={32} />,
    title: "Aman & Terpercaya",
    description:
      "Transaksi dijamin aman dengan enkripsi data. Sudah dipercaya ribuan gamers di seluruh Indonesia.",
    color: "#22c55e",
  },
  {
    icon: <DollarSign size={32} />,
    title: "Harga Paling Murah",
    description:
      "Dapatkan harga terbaik untuk setiap top up. Kami menjamin harga termurah dibanding platform lain.",
    color: "#3b82f6",
  },
  {
    icon: <Headphones size={32} />,
    title: "Support 24/7",
    description:
      "Tim customer support kami siap membantu kamu kapan saja, 24 jam sehari, 7 hari seminggu.",
    color: "#ec4899",
  },
];

// Data banner carousel removed since we only show poster.png now

function Home() {
  const [games, setGames] = useState([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  // FAQ state
  const [openFaq, setOpenFaq] = useState(null);

  // Category state
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    API.get("/games")
      .then((res) => setGames(res.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const getGameCategory = (gameName) => {
    const name = gameName.toLowerCase();
    const pcGames = ["valorant", "steam wallet", "minecraft"];
    if (pcGames.some((pc) => name.includes(pc))) {
      return "pc";
    }
    return "mobile";
  };

  const filteredGames = games
    .filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((game) => {
      if (selectedCategory === "all") return true;
      return getGameCategory(game.name) === selectedCategory;
    });

  return (
    <div className="main-wrapper">
      {/* ============ HERO FULL-WIDTH STATIC BANNER ============ */}
      <section className="hero-banner-section">
        <div className="hero-banner-container">
          <div className="hero-banner-wrapper">
            <img src="/uploads/poster.png" alt="TipTopUp - Top Up Game Termurah" className="hero-single-banner" />
          </div>
        </div>

        {/* Stats bar di bawah banner */}
        <div className="hero-stats-bar">
          <div className="section-container">
            <div className="hero-stats-row">
              <div className="hero-stat-chip">
                <Zap size={16} className="stat-chip-icon" />
                <span className="hero-stat-number">50K+</span>
                <span className="hero-stat-label">Pengguna Aktif</span>
              </div>
              <div className="hero-stat-chip">
                <Gamepad2 size={16} className="stat-chip-icon" />
                <span className="hero-stat-number">100+</span>
                <span className="hero-stat-label">Game Tersedia</span>
              </div>
              <div className="hero-stat-chip">
                <Shield size={16} className="stat-chip-icon" />
                <span className="hero-stat-number">99.9%</span>
                <span className="hero-stat-label">Sukses Rate</span>
              </div>
              <div className="hero-stat-chip">
                <Clock size={16} className="stat-chip-icon" />
                <span className="hero-stat-number">24/7</span>
                <span className="hero-stat-label">Customer Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GAME LIST SECTION ============ */}
      <main className="game-section">
        <div className="section-container">
          <div className="section-header">
            {searchTerm ? (
              <h2 style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <Search size={22} style={{ color: "#ec4899" }} />
                <span>Hasil Pencarian: "{searchTerm}"</span>
              </h2>
            ) : (
              <div className="section-title-row">
                <h2 className="section-title-text">
                  <Gamepad2 size={24} className="section-title-icon" />
                  Game Populer
                </h2>
                <p className="section-title-sub">Pilih game favoritmu dan top up sekarang!</p>
              </div>
            )}
          </div>

          {/* Category Tabs (Horizontally Scrollable) */}
          {!searchTerm && (
            <div className="category-tabs-container">
              <div className="category-tabs">
                <button
                  className={`category-tab ${selectedCategory === "all" ? "active" : ""}`}
                  onClick={() => setSelectedCategory("all")}
                >
                  <Globe size={16} />
                  <span>Semua Game</span>
                </button>
                <button
                  className={`category-tab ${selectedCategory === "mobile" ? "active" : ""}`}
                  onClick={() => setSelectedCategory("mobile")}
                >
                  <Smartphone size={16} />
                  <span>Game Seluler</span>
                </button>
                <button
                  className={`category-tab ${selectedCategory === "pc" ? "active" : ""}`}
                  onClick={() => setSelectedCategory("pc")}
                >
                  <Monitor size={16} />
                  <span>Game PC</span>
                </button>
              </div>
            </div>
          )}

          <div className="game-grid">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}

            {filteredGames.length === 0 && games.length > 0 && (
              <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#888", padding: "40px 0" }}>
                Game dengan nama "{searchTerm}" tidak ditemukan.
              </p>
            )}

            {games.length === 0 &&
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <div className="dummy-card" key={i}>
                    <div className="dummy-img">
                      <div className="dummy-placeholder">
                        <Gamepad2 size={40} color="#33155b" />
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </main>

      {/* ============ KEUNGGULAN SECTION ============ */}
      <section className="advantages-section">
        <div className="section-container">
          <div className="section-title-row center">
            <h2 className="section-title-text">
              Kenapa Memilih <span className="text-gradient">TipTopUp</span>?
            </h2>
            <p className="section-title-sub">
              Platform top up game terbaik dengan berbagai keunggulan untuk pengalaman gaming kamu
            </p>
          </div>

          <div className="advantages-grid">
            {advantagesData.map((item, index) => (
              <div className="advantage-card" key={index}>
                <div className="advantage-icon-wrapper" style={{ backgroundColor: `${item.color}15`, color: item.color, boxShadow: `inset 0 0 20px ${item.color}20` }}>
                  {item.icon}
                </div>
                <h3 className="advantage-title">{item.title}</h3>
                <p className="advantage-desc">{item.description}</p>
                <div className="advantage-glow" style={{ background: `radial-gradient(circle, ${item.color}10, transparent 70%)` }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LIVE CHARACTER PROMO BANNER ============ */}
      <section className="promo-banner-middle-section">
        <div className="section-container">
          <div className="hero-banner-wrapper live-banner">
            {/* Left character (Mobile Legends character) */}
            <div className="banner-char char-left">
              <img src="/uploads/ml1.png" alt="Left MLBB Character" />
            </div>

            {/* Center Brand & Slogan */}
            <div className="banner-center-content">
              <div className="banner-logo-container">
                <span className="banner-logo-text">
                  Tip<span style={{ color: "#ec4899" }}>Top</span><span style={{ color: "#f97316" }}>Up</span>
                </span>
              </div>
              <h2 className="banner-slogan">TEMPAT TOP UP GAME TERAMAN & TERPERCAYA SEPANJANG MASA</h2>
              <div className="banner-badge-row">
                <span className="badge-item">⚡ Proses Instan 1-3 Menit</span>
                <span className="badge-item">🔒 100% Legal & Aman</span>
              </div>
            </div>

            {/* Right character (PUBG Mobile character) */}
            <div className="banner-char char-right">
              <img src="/uploads/pubg.png" alt="Right PUBG Character" />
            </div>

            {/* Glowing background blends */}
            <div className="banner-glow-left"></div>
            <div className="banner-glow-right"></div>
          </div>
        </div>
      </section>
      <section className="faq-section">
        <div className="section-container">
          <div className="section-title-row center">
            <h2 className="section-title-text">
              FAQ <span className="text-gradient">Umum</span>
            </h2>
            <p className="section-title-sub">
              Pertanyaan yang sering ditanyakan oleh pelanggan kami
            </p>
          </div>

          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={index}>
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  <span className="faq-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="faq-q-text">{faq.question}</span>
                  <ChevronDown size={20} className={`faq-chevron ${openFaq === index ? "rotated" : ""}`} />
                </button>
                <div className="faq-answer-wrapper" style={{ maxHeight: openFaq === index ? "300px" : "0px" }}>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CUSTOMER SUPPORT SECTION ============ */}
      <section className="support-section">
        <div className="section-container">
          <div className="section-title-row center">
            <h2 className="section-title-text">
              Dukungan <span className="text-gradient">Pelanggan</span>
            </h2>
            <p className="section-title-sub">
              Butuh bantuan? Tim support kami siap melayani kamu
            </p>
          </div>

          <div className="support-grid">
            <a href="https://wa.me/6281285976653" target="_blank" rel="noopener noreferrer" className="support-card">
              <div className="support-icon-wrapper whatsapp-bg">
                <MessageCircle size={28} />
              </div>
              <h3 className="support-card-title">WhatsApp</h3>
              <p className="support-card-desc">Chat langsung dengan tim kami</p>
              <span className="support-card-info">+62 812-8597-6653</span>
            </a>

            <a href="mailto:support@tiptopup.com" className="support-card">
              <div className="support-icon-wrapper email-bg">
                <Mail size={28} />
              </div>
              <h3 className="support-card-title">Email</h3>
              <p className="support-card-desc">Kirim pertanyaan via email</p>
              <span className="support-card-info">support@tiptopup.com</span>
            </a>

            <div className="support-card">
              <div className="support-icon-wrapper clock-bg">
                <Clock size={28} />
              </div>
              <h3 className="support-card-title">Jam Operasional</h3>
              <p className="support-card-desc">Kami siap melayani kamu</p>
              <span className="support-card-info">24 Jam / 7 Hari</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="site-footer">
        <div className="footer-glow"></div>
        <div className="section-container">
          <div className="footer-grid">
            {/* Kolom 1: Tentang */}
            <div className="footer-col branding-col">
              <div className="footer-brand">
                <span className="footer-logo-text">
                  Tip<span style={{ color: "#ec4899" }}>Top</span>
                  <span style={{ color: "#f97316" }}>Up</span>
                </span>
              </div>
              <p className="footer-about-text">
                Website top up game dan voucher resmi di Indonesia, menawarkan harga kompetitif, legalitas 100%, keamanan terpercaya, layanan 24 jam, serta metode pembayaran terlengkap.
              </p>
              <div className="footer-socials-circle">
                <a href="https://wa.me/6281285976653" target="_blank" rel="noopener noreferrer" className="social-circle wa" aria-label="WhatsApp">
                  <Phone size={16} />
                </a>
                <a href="#" className="social-circle ig" aria-label="Instagram">
                  <Globe size={16} />
                </a>
                <a href="#" className="social-circle yt" aria-label="Youtube">
                  <Video size={16} />
                </a>
                <a href="#" className="social-circle tg" aria-label="Telegram">
                  <Send size={16} />
                </a>
              </div>
            </div>

            {/* Kolom 2: Peta Situs */}
            <div className="footer-col">
              <h4 className="footer-col-title-store">🗺️ Peta Situs</h4>
              <ul className="footer-links-store">
                <li><Link to="/">🏠 Beranda</Link></li>
                <li><Link to="/login">📩 Masuk</Link></li>
                <li><Link to="/history">💻 Cek Transaksi</Link></li>
                <li><a href="https://wa.me/6281285976653" target="_blank" rel="noopener noreferrer">💬 Hubungi Kami</a></li>
              </ul>
            </div>

            {/* Kolom 3: Dukungan & Legalitas */}
            <div className="footer-col">
              <h4 className="footer-col-title-store">🛡️ Dukungan & Legalitas</h4>
              <ul className="footer-links-store">
                <li><a href="https://wa.me/6281285976653" target="_blank" rel="noopener noreferrer">🟢 WhatsApp</a></li>
                <li><a href="#">⚖️ Kebijakan Pribadi</a></li>
                <li><a href="#">🏛️ Syarat & Ketentuan</a></li>
              </ul>
            </div>

            {/* Kolom 4: Kelompok Kami */}
            <div className="footer-col">
              <h4 className="footer-col-title-store">👥 Kelompok Kami</h4>
              <ul className="footer-team">
                <li>
                  <div className="team-avatar">A</div>
                  <span>Adinda Angesti Chandra</span>
                </li>
                <li>
                  <div className="team-avatar">B</div>
                  <span>Angeliq MexgaputriPrameswari</span>
                </li>
                <li>
                  <div className="team-avatar">C</div>
                  <span>Autumm Zebtotanel</span>
                </li>
                <li>
                  <div className="team-avatar">D</div>
                  <span>Latif Wibowo</span>
                </li>
                <li>
                  <div className="team-avatar">E</div>
                  <span>Umar Al Faruq</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p>© 2025 TipTopUp. All rights reserved. Made with ❤️ by Kelompok Kami</p>
          </div>
        </div>
      </footer>

      {/* Floating Contact Button (WhatsApp) */}
      <a href="https://wa.me/6281285976653" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <MessageCircle size={30} color="white" />
      </a>
    </div>
  );
}

export default Home;