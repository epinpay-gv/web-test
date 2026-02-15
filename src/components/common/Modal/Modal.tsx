"use client";

import { ReactNode } from "react";

import { Close } from "flowbite-react-icons/outline";
import { Button } from "@/components/common/Button/Button";

type ModalTheme = "info" | "popup";
type ModalSize = "sm" | "md" | "lg";

interface ModalProps {
  open: boolean;
  title?: string;
  description?: string;
  children?: ReactNode;
  icon?: ReactNode;
  theme?: ModalTheme;
  size?: ModalSize;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose: () => void;
}

const MODAL_SIZE: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

const MODAL_THEME: Record<ModalTheme, string> = {
  info: `border-(--border-default) bg-(--bg-neutral-primary-soft)`,
  popup: `border-(--border-default) bg-(--bg-neutral-primary-soft)`,
};

export function Modal({
  open,
  title,
  description,
  children,
  icon,
  theme = "info",
  size = "md",
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  onClose,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div
        className={`
          w-full
          ${MODAL_SIZE[size]}
          ${MODAL_THEME[theme]}
          rounded-xl
          shadow-xl
          p-6
          relative
          z-20
        `}
      >
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <Close size={18} />
          </button>
        )}

        {/* Icon */}
        {theme === "popup" && icon && (
          <div className="flex justify-center mb-4 text-(--text-fg-disabled)">
            {icon}
          </div>
        )}

        {/* Header */}
        {title && (
          <h3
            className={`
              text-lg font-semibold mb-3 text-(--text-heading)
              ${theme === "popup" ? "text-center" : ""}
            `}
          >
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-center mb-4 text-(--text-body)">
            {description}
          </p>
        )}

        {/* Custom Content */}
        {children && <div className="mb-4">{children}</div>}

        {/* Footer */}
        {(confirmText || cancelText) && (
          <div
            className={`
              flex gap-3 mt-6
              ${theme === "popup" ? "justify-center" : "justify-start"}
            `}
          >
            {cancelText && (
              <Button
                text={cancelText}
                variant="secondary"
                appearance="filled"
                padding="xl"
                size="base"
                textSize="sm"
                onClick={onCancel}
              />
            )}

            {confirmText && (
              <Button
                text={confirmText}
                variant="brand"
                appearance="filled"
                padding="xl"
                size="base"
                textSize="sm"
                onClick={onConfirm}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}