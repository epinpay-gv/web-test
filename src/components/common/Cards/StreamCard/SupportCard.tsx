"use client";

import { useState } from "react";

const PRESET_AMOUNTS = [10, 50, 100, 200, 500];

interface SupportCardProps {
    userName?: string;
    userInitials?: string;
    onSupport: (amount: number, message: string) => void;
}

export default function SupportCard({
    userName = "Burak",
    userInitials = "BA",
    onSupport,
}: SupportCardProps) {
    const [selectedAmount, setSelectedAmount] = useState<number>(0);
    const [message, setMessage] = useState("");

    const handlePreset = (amount: number) => {
        setSelectedAmount((prev) => (prev === amount ? 0 : amount));
    };


    return (
        <div className="min-h-105 rounded-2xl font-sans">
            {/* Başlık */}
            <h2 className="text-3xl font-semibold text-white mb-6">
                Destek olmak için
            </h2>

            {/* Kart */}
            <div className="h-34 bg-[#1D303A] border border-[#2a3f55] rounded-2xl px-5 pt-5 pb-6 mb-5">
                {/* Üst satır: kullanıcı + tutar */}
                <div className="flex items-start justify-between mb-4 h-12">
                    {/* Kullanıcı */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#081D28] flex items-center justify-center text-[13px] font-semibold text-[#99A1AF]">
                            {userInitials}
                        </div>
                        <span className="text-[18px] font-semibold text-[#dce6f0]">
                            {userName}
                        </span>
                    </div>

                    {/* Destek tutarı */}
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-sm">Destek tutarı</span>
                        <div className="bg-[#061821] flex items-center justify-center w-13 h-6 text-sm font-bold text-[#b8f040] border rounded-sm border-[#4A5565]">
                            <span>₺</span>
                            <input
                                type="number"
                                min={0}
                                value={selectedAmount === 0 ? "" : selectedAmount}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    setSelectedAmount(isNaN(val) ? 0 : val);
                                }}
                                placeholder="0"
                                className="bg-transparent outline-none border-none text-[#b8f040] font-bold text-[16px] w-8 text-center placeholder-[#b8f040] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Mesaj alanı */}
                <textarea
                    placeholder="Mesajınız..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-[40px] bg-transparent border-none outline-none text-[15px] text-[#8fa3b8] placeholder-[#99A1AF] resize-none font-sans leading-relaxed"
                />
            </div>

            {/* Preset butonlar */}
            <div className="grid grid-cols-5 gap-2 mb-5">
                {PRESET_AMOUNTS.map((amount) => (
                    <button
                        key={amount}
                        onClick={() => handlePreset(amount)}
                        className={`bg-[#BBF451] rounded-[12px] py-[10px] px-2 text-[14px] font-semibold text-black transition-all duration-100 active:scale-[0.97] hover:brightness-105 ${selectedAmount === amount
                            ? "outline outline-[2.5px] outline-white/60 outline-offset-2"
                            : ""
                            }`}
                    >
                        ₺{amount}
                    </button>
                ))}
            </div>

            {/* Destek ol butonu */}
            <button
                onClick={() => onSupport(selectedAmount, message)}
                className="bg-[#00BBE5] rounded-2xl px-[16px] py-[10px] text-[18px] font-semibold text-black transition-all duration-100 active:scale-[0.97] hover:brightness-105"
            >
                Destek ol
            </button>
        </div>
    );
}