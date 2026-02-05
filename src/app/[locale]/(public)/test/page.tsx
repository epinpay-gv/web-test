"use client";

import { useState } from "react";
import { useTheme } from "next-themes"; // Zustand yerine bunu kullanıyoruz
import { Input } from "@/components/common/Form/Input/Input";
import { User } from "flowbite-react-icons/outline";
import { useEffect } from "react";
import { Checkbox } from "@/components/common/CheckBox/CheckBox";

export default function TestPage() {

  return (
    <div className="min-h-screen gap-8 flex justify-center items-center transition-colors bg-white dark:bg-slate-900">
      {/* DİKKAT: bg-white dark:bg-slate-900 kullandığında 
          next-themes temayı değiştirdiğinde Tailwind bunu otomatik yakalar.
      */}
      <div className="flex flex-col gap-10">
        <div className="flex gap-4">
          <div>
            <Checkbox variant="square" />
            <Checkbox variant="square" checked />
          </div>
          <div>
            <Checkbox variant="square" disabled/>
            <Checkbox variant="square" disabled checked/>
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <Checkbox variant="circle" />
            <Checkbox variant="circle" checked />
          </div>
          <div>
            <Checkbox variant="circle" disabled/>
            <Checkbox variant="circle" disabled checked/>
          </div>
        </div>
        <div className="flex gap-10">
          <Checkbox
            variant="square"
            label="Remember me"
          />
          <Checkbox
            variant="square"
            label="Remember me"
            helperText="Save my credentials for easier sign-in"
          />

          <div className="flex items-start gap-3 rounded-lg bg-slate-800/60 px-4 py-3">
            <Checkbox
              variant="square"
              label="Remember me"
              helperText="Save my credentials for easier sign-in"
            />
          </div>


        </div>
      </div>
    </div>
  );
}