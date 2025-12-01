import { createPortal } from "react-dom";

type ModalAction = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
}: ModalProps) {
  if (!isOpen) return null;

  const actionClass = (variant?: ModalAction["variant"]) => {
    if (variant === "danger") {
      return "px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 transition";
    }
    if (variant === "secondary") {
      return "px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition";
    }
    return "btn-primary text-sm";
  };

  return (
    createPortal(
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 z-50"
        onClick={onClose}
      >
        <div
          className="panel bg-white dark:bg-[#0f1f2b] border border-black/10 dark:border-white/10 max-w-md w-full p-6 rounded-2xl shadow-2xl space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <div className="space-y-3 text-sm text-muted">{children}</div>
          <div className="flex justify-end gap-3 pt-2">
            {secondaryAction && (
              <button
                type="button"
                className={actionClass(secondaryAction.variant || "secondary")}
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </button>
            )}
            {primaryAction && (
              <button
                type="button"
                className={actionClass(primaryAction.variant)}
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </button>
            )}
          </div>
        </div>
      </div>,
      document.body
    )
  );
}
