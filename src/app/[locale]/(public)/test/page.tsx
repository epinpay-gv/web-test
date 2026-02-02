"use client";

import { useState } from "react";
import { useThemeStore } from "@/features/theme/store/useThemeStore";
import { Input } from "@/components/common/Form/Input/Input";
import { User } from "flowbite-react-icons/outline";

export default function Test() {
  const theme = useThemeStore((state) => state.theme);
  const hydrated = useThemeStore((state) => state.hydrated);

  const bgColor =
    hydrated && theme === "dark" ? "bg-slate-900" : "bg-white";

  const [value, setValue] = useState("");

  return (
    <div
      className={`min-h-screen flex justify-center items-center transition-colors ${bgColor}`}
    >
      <Input
        placeholder="Test input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
        inputSize="sm"
        variant="addOnIcon"
        aria-invalid="true"
        addOnIcon={<User />}
      />
    </div>
  );
}
