"use client";
import clsx from "clsx";
import { Close } from "flowbite-react-icons/outline";
import { TextareaHTMLAttributes, forwardRef } from "react";

type TextareaSize = "sm" | "base" | "lg";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onClear?: () => void;
  textareaSize?: TextareaSize;
  wrapperClassName?: string;
  showClearButton?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      textareaSize = "base",
      className,
      wrapperClassName,
      value,
      onChange,
      onClear,
      showClearButton = true,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const canShowClear = showClearButton && !!value && !!onClear;

    return (
      <div
        className={clsx(
          "input-wrapper relative w-full", 
          `input-${textareaSize}`,
          wrapperClassName
        )}
      >
        <div className="input-inner relative">
          <textarea
            {...props}
            ref={ref}
            value={value}
            onChange={onChange}
            rows={rows}
            className={clsx(
              "input min-h-20 w-full resize-none scrollbar-thin", 
              "bg-[#0d121a] border border-gray-800 rounded-lg p-3 text-sm text-white",
              "focus:border-cyan-500 outline-none transition-colors",
              "placeholder:text-gray-500",
              canShowClear && "pr-10",
              className
            )}
          />

          {/* CLEAR BUTTON */}
          {canShowClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 top-3 text-gray-500 hover:text-white transition-colors z-10"
              aria-label="Clear textarea"
            >
              <Close className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;