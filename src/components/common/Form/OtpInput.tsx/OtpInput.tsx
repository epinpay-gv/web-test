'use client';

import React, { useRef, useState } from 'react';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

export function OtpInput({ value, onChange, length = 6, disabled = false }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;

    const newOtp = value.split('');
    newOtp[index] = val.substring(val.length - 1);
    const combinedOtp = newOtp.join('');
    onChange(combinedOtp);

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData('text').slice(0, length);
    if (!/^\d+$/.test(data)) return;
    onChange(data);
  };

  return (
    <div className="flex gap-2 justify-between" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {inputRefs.current[index] = el;}}  
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          disabled={disabled}
          className="w-11 h-11 text-center text-xl font-bold bg-[#1A2C38] border border-[#2D3E4A] rounded-xl text-white focus:border-(--text-fg-brand) focus:ring-1 focus:ring-(--text-fg-brand) outline-none transition-all disabled:opacity-50"
        />
      ))}
    </div>
  );
}