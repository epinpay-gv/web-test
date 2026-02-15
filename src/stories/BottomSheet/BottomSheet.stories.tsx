"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { BottomSheet } from "@/components/common/BottomSheet/BottomSheet";
import { Button } from "@/components/common/Button/Button";

const meta: Meta<typeof BottomSheet> = {
  title: "Common/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: {
      control: "text",
    },
    onClose: { action: "closed" },
    onBack: { action: "back" },
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

/* -------------------------------------------------------
   BASE STORY
------------------------------------------------------- */
export const Default: Story = {
  args: {
    title: "Bottom Sheet Başlık",
  },
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button
          text="Bottom Sheet Aç"
          onClick={() => setOpen(true)}
        />

        <BottomSheet
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
        >
          <div className="p-6 space-y-4">
            <p>
              Burası BottomSheet içeriği.
            </p>
            <p>
              Scroll testi için biraz içerik:
            </p>

            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-700/40 rounded-md"
              />
            ))}
          </div>
        </BottomSheet>
      </>
    );
  },
};

/* -------------------------------------------------------
   WITH BACK BUTTON
------------------------------------------------------- */
export const WithBackButton: Story = {
  args: {
    title: "Geri Butonlu Sheet",
  },
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button
          text="Bottom Sheet Aç"
          onClick={() => setOpen(true)}
        />

        <BottomSheet
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
          onBack={() => alert("Geri tıklandı")}
        >
          <div className="p-6">
            <p>Geri butonlu kullanım.</p>
          </div>
        </BottomSheet>
      </>
    );
  },
};

/* -------------------------------------------------------
   NO TITLE
------------------------------------------------------- */
export const NoTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button
          text="Bottom Sheet Aç"
          onClick={() => setOpen(true)}
        />

        <BottomSheet
          isOpen={open}
          onClose={() => setOpen(false)}
        >
          <div className="p-6">
            <p>Başlıksız kullanım.</p>
          </div>
        </BottomSheet>
      </>
    );
  },
};
