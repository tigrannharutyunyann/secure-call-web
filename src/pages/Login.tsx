import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EyeIcon from "../assets/icons/eye.svg?react";
import EyeOffIcon from "../assets/icons/eye-off.svg?react";
import Logo from "../assets/logo/logo_transparent.png";
import SquareIcon from "../assets/icons/square.svg?react";
import SquareCheckIcon from "../assets/icons/square-check.svg?react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<"email" | "password" | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validateEmail = (value: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,10}$/.test(value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setErrorField(null);

    if (!email.trim()) {
      setError(t("auth.login.errors.emailRequired"));
      setErrorField("email");
      return;
    }
    if (!password.trim()) {
      setError(t("auth.login.errors.passwordRequired"));
      setErrorField("password");
      return;
    }
    if (!validateEmail(email)) {
      setError(t("auth.login.errors.invalidEmail"));
      setErrorField("email");
      return;
    }
    // Simulate login
    navigate("/contacts");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-[#0b0b0b] dark:via-[#0d0d0d] dark:to-[#131313] p-6">
      <div className="w-full max-w-md panel p-8 animate-fadeIn">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex items-center justify-center">
            <img
              src={Logo}
              alt="Secure Call logo"
              className="w-14 h-14 object-contain"
            />
          </div>
        </div>

        <h1 className="text-center text-3xl font-bold mb-2">{t("auth.login.title")}</h1>
        <p className="text-center text-muted text-sm mb-6">
          {t("auth.login.subtitle")}
        </p>

        {error && (
          <div className="bg-danger/10 border border-danger/30 text-danger p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted flex items-center gap-1">
              {t("auth.login.emailLabel")} {errorField === "email" && <span className="text-red-500">*</span>}
            </label>
            <input
              type="email"
              placeholder={t("auth.login.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black/5 dark:bg-[#0D0D0D] text-slate-900 dark:text-white rounded-lg border border-black/10 dark:border-white/10 focus:border-accent outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-sm text-muted flex items-center gap-1">
              {t("auth.login.passwordLabel")} {errorField === "password" && <span className="text-red-500">*</span>}
            </label>
            <input
              type={showPass ? "text" : "password"}
              placeholder={t("auth.login.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/5 dark:bg-[#0D0D0D] text-slate-900 dark:text-white rounded-lg border border-black/10 dark:border-white/10 focus:border-accent outline-none transition pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPass((prev) => !prev)}
              className="absolute right-3 top-11 text-white/80 dark:text-white/80 hover:text-white transition"
              aria-label={showPass ? t("auth.login.hidePassword") : t("auth.login.showPassword")}
            >
              {showPass ? (
                <EyeOffIcon className="w-5 h-5 text-white" />
              ) : (
                <EyeIcon className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted">
            <button
              type="button"
              onClick={() => setRemember((prev) => !prev)}
              className="hover:text-accent transition"
              aria-label="Remember me"
            >
              {remember ? (
                <SquareCheckIcon className="w-4 h-4 text-accent" />
              ) : (
                <SquareIcon className="w-4 h-4 text-muted" />
              )}
            </button>
            <span>Remember me</span>
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
          >
            {t("auth.login.submit")}
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <span className="text-muted">{t("auth.login.newHere")}</span>{" "}
          <Link to="/register" className="text-accent hover:text-accent/80 transition">
            {t("auth.login.createAccount")}
          </Link>
        </div>
      </div>
    </div>
  );
}
