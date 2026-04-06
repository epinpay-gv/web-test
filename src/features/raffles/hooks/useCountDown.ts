/* eslint-disable react-hooks/set-state-in-effect */
import { getTimeLeft } from "@/lib/utils";
import { useState, useEffect } from "react";

export function useCountdown(targetDate: string | Date | undefined | null) {
  const [timeLeft, setTimeLeft] = useState("-");

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft("-");
      return;
    }
    setTimeLeft(getTimeLeft(targetDate));
    const timer = setInterval(() => {
      const current = getTimeLeft(targetDate);
      setTimeLeft(current);
      if (current === "Sona erdi") {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}