import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SquareIcon from "../assets/icons/square.svg?react";
import SquareCheckIcon from "../assets/icons/square-check.svg?react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [agree, setAgree] = useState(false);
  const [errorField, setErrorField] = useState<
    "email" | "code" | "password" | "confirm" | null
  >(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validateEmail = (value: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,10}$/.test(value);

  const sendCode = () => {
    setError("");
    setInfo("");
    setErrorField(null);
    if (!email.trim()) {
      setError(t("auth.register.errors.emailRequired"));
      setErrorField("email");
      return;
    }
    if (!validateEmail(email)) {
      setError(t("auth.register.errors.invalidEmail"));
      setErrorField("email");
      return;
    }
    setInfo(t("auth.register.infoCodeSent"));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setErrorField(null);

    if (!email.trim()) {
      setError(t("auth.register.errors.emailRequired"));
      setErrorField("email");
      return;
    }
    if (!validateEmail(email)) {
      setError(t("auth.register.errors.invalidEmail"));
      setErrorField("email");
      return;
    }
    if (!code.trim()) {
      setError(t("auth.register.errors.codeRequired"));
      setErrorField("code");
      return;
    }
    if (!password.trim()) {
      setError(t("auth.register.errors.passwordRequired"));
      setErrorField("password");
      return;
    }
    if (!confirm.trim()) {
      setError(t("auth.register.errors.confirmRequired"));
      setErrorField("confirm");
      return;
    }
    if (password.length < 6) {
      setError(t("auth.register.errors.passwordShort"));
      setErrorField("password");
      return;
    }
    if (password !== confirm) {
      setError(t("auth.register.errors.passwordMismatch"));
      setErrorField("confirm");
      return;
    }
    if (!agree) {
      setError("You must agree to the Terms of Use and Privacy Policy");
      return;
    }
    // Simulate success
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-[#0b0b0b] dark:via-[#0d0d0d] dark:to-[#131313] p-6">
      <div className="w-full max-w-md panel p-8 animate-fadeIn">
        <h1 className="text-center text-3xl font-bold mb-2">{t("auth.register.title")}</h1>
        <p className="text-center text-muted text-sm mb-6">
          {t("auth.register.subtitle")}
        </p>

        {error && (
          <div className="bg-danger/10 border border-danger/30 text-danger p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {info && (
          <div className="bg-success/10 border border-success/30 text-success p-3 rounded-lg mb-4 text-sm text-center">
            {info}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted flex items-center gap-1">
              {t("auth.register.emailLabel")} {errorField === "email" && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder={t("auth.register.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black/5 dark:bg-[#0D0D0D] text-slate-900 dark:text-white rounded-lg border border-black/10 dark:border-white/10 focus:border-accent outline-none transition pr-28"
              />
              <button
                type="button"
                onClick={sendCode}
                className="absolute right-2 top-2 text-xs px-3 py-2 rounded-md bg-accent text-black shadow-md shadow-accent/20 hover:bg-accent/80 transition font-semibold"
              >
                {t("auth.register.sendCode")}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted flex items-center gap-1">
              {t("auth.register.codeLabel")} {errorField === "code" && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              placeholder={t("auth.register.codePlaceholder")}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 bg-black/5 dark:bg-[#0D0D0D] text-slate-900 dark:text-white rounded-lg border border-black/10 dark:border-white/10 focus:border-accent outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted flex items-center gap-1">
              {t("auth.register.passwordLabel")} {errorField === "password" && <span className="text-red-500">*</span>}
            </label>
            <input
              type="password"
              placeholder={t("auth.register.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/5 dark:bg-[#0D0D0D] text-slate-900 dark:text-white rounded-lg border border-black/10 dark:border-white/10 focus:border-accent outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted flex items-center gap-1">
              {t("auth.register.confirmLabel")} {errorField === "confirm" && <span className="text-red-500">*</span>}
            </label>
            <input
              type="password"
              placeholder={t("auth.register.confirmPlaceholder")}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-3 bg-black/5 dark:bg-[#0D0D0D] text-slate-900 dark:text-white rounded-lg border border-black/10 dark:border-white/10 focus:border-accent outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2 text-sm text-muted">
              <button
                type="button"
                onClick={() => setAgree((prev) => !prev)}
                className="mt-0.5 hover:text-accent transition"
                aria-pressed={agree}
                aria-label="Agree to terms"
              >
                {agree ? (
                  <SquareCheckIcon className="w-4 h-4 text-accent" />
                ) : (
                  <SquareIcon className="w-4 h-4 text-muted" />
                )}
              </button>
              <span>
                I agree to the{" "}
                <Link to="/terms" className="text-accent hover:underline">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </div>
            <p className="text-xs text-muted">
              By creating an account, you agree to the{" "}
              <Link to="/terms" className="text-accent hover:underline">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <button
              type="submit"
              disabled={!agree}
              className={`btn-primary w-full ${!agree ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {t("auth.register.submit")}
            </button>
          </div>
        </form>

        <div className="text-center mt-6 text-sm">
          <span className="text-muted">{t("auth.register.already")}</span>{" "}
          <Link to="/login" className="text-accent hover:text-accent/80 transition">
            {t("auth.register.signIn")}
          </Link>
        </div>
      </div>
    </div>
  );
}
