"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRegisterStore } from "../store/register.store";

interface UseVerifyOtpProps {
  onVerify: (otp: string) => void;
  onResend: () => Promise<void> | void;
  isLoading: boolean;
  expiresIn?: number;
}

export function useVerifyOtp({
  onVerify,
  onResend,
  isLoading,
  expiresIn = 10,
}: UseVerifyOtpProps) {
  const store = useRegisterStore();
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(expiresIn);

  useEffect(() => {
    setTimeLeft(expiresIn);
  }, [expiresIn]);

  const canResend = useMemo(() => timeLeft === 0, [timeLeft]);
  const isExpired = useMemo(() => timeLeft === 0, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const formattedTime = useMemo(
    () => formatTime(timeLeft),
    [timeLeft, formatTime],
  );

  const handleOtpChange = (value: string) => {
    setOtp(value);

    if (value.length === 6 && !isLoading) {
      onVerify(value);
    }
  };

  const handleResend = async () => {
    if (!canResend || isLoading) return;

    setOtp("");
    await onResend();
    
    // Using setTimeout to read the updated store after synchronous state updates
    setTimeout(() => {
      const currentStore = useRegisterStore.getState();
      if (!currentStore.error) {
        setTimeLeft(currentStore.otpExpiresIn);
      }
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6 && !isLoading) {
      onVerify(otp);
    }
  };

  const returnRegisterForm = () => {
    store.setStep("form")
  };

  return {
    otp,
    timeLeft,
    canResend,
    isExpired,
    formattedTime,
    handleOtpChange,
    handleResend,
    handleSubmit,
    returnRegisterForm
  };
}
