type HeaderBarProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

export default function HeaderBar({ title, subtitle, actions }: HeaderBarProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#0F1016]/70 backdrop-blur">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
