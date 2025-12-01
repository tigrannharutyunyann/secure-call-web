import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../assets/logo/logo_transparent.png";
import ShieldCheckIcon from "../assets/icons/shield-check.svg?react";
import KeyIcon from "../assets/icons/key-round.svg?react";
import RefreshIcon from "../assets/icons/refresh-ccw.svg?react";
import BellIcon from "../assets/icons/bell.svg?react";
import HandshakeIcon from "../assets/icons/handshake.svg?react";
import BadgeCheckIcon from "../assets/icons/badge-check.svg?react";

export default function Landing() {
  const { t, i18n } = useTranslation();
  const languages = [
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
    { code: "hy", label: "HY" },
  ];
  const currentLang = i18n.resolvedLanguage || i18n.language;
  const explainers = t("explain.cards", { returnObjects: true }) as { title: string; body: string }[];
  const explainIcons = [ShieldCheckIcon, KeyIcon, RefreshIcon, BellIcon, BadgeCheckIcon, HandshakeIcon];
  const currentLangLabel = languages.find((l) => currentLang?.startsWith(l.code))?.label || currentLang?.toUpperCase() || "EN";
  const getNextLanguage = () => {
    const idx = languages.findIndex((l) => currentLang?.startsWith(l.code));
    const next = idx === -1 ? languages[0] : languages[(idx + 1) % languages.length];
    i18n.changeLanguage(next.code);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-[#0b0b0b] dark:via-[#0d0d0d] dark:to-[#131313] text-slate-900 dark:text-white">
      <div className="w-full bg-accent/10 dark:bg-accent/20 border-b border-accent/30 dark:border-accent/40 shadow-sm sticky top-0 z-30 backdrop-blur">
        <div className="w-full px-5 sm:px-7 py-5">
          <header className="flex items-center justify-between gap-5 flex-wrap">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
                <img src={Logo} alt="Secure Call logo" className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain" />
                <div className="text-left">
                  <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">Secure Call</p>
                  <p className="text-xs sm:text-sm text-muted -mt-1">Private by design</p>
                </div>
              </Link>
            </div>

            <nav className="flex items-center gap-2.5 sm:gap-3 text-sm sm:text-base flex-wrap justify-end">
              <button
                type="button"
                onClick={getNextLanguage}
                className="px-3 py-2 rounded-lg border bg-accent text-black border-accent/60 shadow-sm transition duration-200 hover:brightness-110 font-semibold"
                title="Switch language"
              >
                {currentLangLabel}
              </button>
              <a href="#about" className="px-3.5 py-2.5 rounded-lg text-slate-900 dark:text-white transition duration-200 hover:bg-accent/15 dark:hover:bg-accent/20 hover:text-accent dark:hover:text-accentLight">
                {t("nav.about")}
              </a>
              <a href="#download" className="px-3.5 py-2.5 rounded-lg text-slate-900 dark:text-white transition duration-200 hover:bg-accent/15 dark:hover:bg-accent/20 hover:text-accent dark:hover:text-accentLight">
                {t("nav.download")}
              </a>
              <Link to="/login" className="btn-secondary">{t("nav.signIn")}</Link>
              <Link to="/register" className="btn-primary">{t("nav.getStarted")}</Link>
            </nav>
          </header>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-12 flex flex-col gap-10">
        {/* SECTION A — HERO */}
        <section className="w-full space-y-8 relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/10 via-transparent to-[#0f3f44]/15 dark:from-[#0f1c2a]/40 dark:via-transparent dark:to-[#0f3f44]/25 -z-10" />
          <div className="panel p-6 md:p-8 lg:p-10 bg-gradient-to-r from-[#0b2f32] via-[#0f3f44] to-[#11555c] text-white border border-white/10 shadow-2xl shadow-black/20">
            <div className="flex flex-col gap-6 animate-fadeIn max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 bg-white/10 text-xs uppercase tracking-[0.28em] font-semibold text-white shadow-sm">
                  {t("hero.tagline")}
                </span>
              </div>
              <div className="space-y-5">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  {t("hero.title")}
                </h1>
                <p className="text-lg sm:text-xl text-white/90">
                  {t("hero.subtitle")}
                </p>
                <p className="text-sm sm:text-base text-white/80">
                  {t("hero.supporting")}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/register" className="btn-primary">{t("hero.ctaPrimary")}</Link>
                <a
                  href="#explain"
                  className="px-3.5 py-2.5 rounded-lg text-white/85 text-sm sm:text-base transition duration-200 flex items-center gap-1 hover:bg-accent/15 dark:hover:bg-accent/20 hover:text-accent dark:hover:text-accentLight"
                >
                  {t("hero.ctaSecondary")}
                </a>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-white/90 mt-2">
                <Badge label={t("hero.badges.e2e")} />
                <Badge label={t("hero.badges.srtp")} />
                <Badge label={t("hero.badges.transparency")} />
                <Badge label={t("hero.badges.device")} />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION C — ABOUT + HOW WE EXPLAIN SECURITY */}
        <section id="learn-more" className="panel p-8 space-y-6 w-full mt-4">
          <div className="space-y-3 scroll-mt-28" id="about">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{t("about.heading")}</h2>
            <p className="text-lg text-slate-700 dark:text-slate-200">
              {t("about.subtitle")}
            </p>
            <div className="space-y-3 text-slate-700 dark:text-slate-200 leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 scroll-mt-28" id="explain">
            <img src={Logo} alt="Secure Call logo" className="w-10 h-10 object-contain" />
            <div>
              <h2 className="text-2xl font-semibold">{t("about.howHeading")}</h2>
              <p className="text-slate-600 dark:text-slate-300">{t("about.howDesc")}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm items-start">
            {explainers.map(({ title, body }, idx) => {
              const Icon = explainIcons[idx % explainIcons.length];
              return (
                <div
                  key={title}
                  className={`p-4 sm:p-5 rounded-xl border border-accent/20 bg-[#0d2a34] text-white shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.01] ${
                    idx % 2 === 0 ? "" : ""
                  }`}
                >
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="font-semibold text-white text-base">{title}</p>
                      <p className="text-slate-200 leading-relaxed text-sm">{body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </section>

        {/* SECTION D — DOWNLOAD */}
        <section id="download" className="panel p-8 space-y-4 w-full">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{t("download.heading")}</h2>
            <p className="text-slate-700 dark:text-slate-200 max-w-3xl leading-relaxed">
              {t("download.desc")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary">{t("download.button")}</button>
          </div>
        </section>

        {/* SECTION E — FOOTER */}
        <footer className="py-8 text-center text-sm text-slate-600 dark:text-slate-400 space-y-2">
          <div>© 2025 Secure Call — Built for privacy.</div>
          <div className="flex items-center justify-center gap-3">
            <a href="/terms" className="hover:underline">Terms of Use</a>
            <span>•</span>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return <span className="px-3 py-1 rounded-lg bg-white/8 border border-white/20 text-white/90 shadow-sm">{label}</span>;
}
