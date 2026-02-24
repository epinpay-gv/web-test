"use client";

import { useState } from "react";
import UserPageHeader from "@/features/user/components/UserPageHeader";
import { mockUserSettings, countryOptions, currencyOptions, UserSettingsDTO } from "@/features/user/mocks/settings.mock";
import Dropdown from "@/components/common/Dropdown/DropdownMenu";
import { AngleDown } from "flowbite-react-icons/outline";

export default function SettingsPage() {
    const [settings, setSettings] =
        useState<UserSettingsDTO>(mockUserSettings);

    const handleCountryChange = (value: string) => {
        setSettings((prev) => ({
            ...prev,
            system: { ...prev.system, country: value },
        }));
    };

    const handleCurrencyChange = (value: string) => {
        setSettings((prev) => ({
            ...prev,
            system: { ...prev.system, currency: value },
        }));
    };

    // const handleNotificationChange = (checked: boolean) => {
    //     setSettings((prev) => ({
    //         ...prev,
    //         notifications: { ...prev.notifications, email: checked },
    //     }));
    // };

    const handleSave = () => {
        console.log("Kaydedilecek veri:", settings);
        // SERVİCE CAGRISI EKLENECEK.
    };

    return (
        <div className="space-y-4">
            <UserPageHeader title="Ayarlar" />

            <div className="space-y-12">

                {/* Sistem Tercihleri */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-[16px] font-semibold">Sistem Tercihleri</h2>
                        <p className="text-sm text-(--text-body)">
                            Sistem ve kullanım tercihlerinizi buradan düzenleyebilirsiniz.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 w-[384px]"> 
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Ülke</label>
                            <Dropdown
                                options={countryOptions}
                                value={settings.system.country}
                                onChange={handleCountryChange}
                                icon={<AngleDown />}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Para Birimi</label>
                            <Dropdown
                                options={currencyOptions}
                                value={settings.system.currency}
                                onChange={handleCurrencyChange}
                                icon={<AngleDown />}
                            />
                        </div>
                    </div>
                </section>

                {/* Bildirim Tercihleri */}
                <section>
                    <div>
                        <h2 className="text-[16px] font-semibold">Bildirim Tercihleri</h2>
                        <p className="text-sm text-(--text-body)">
                            Bildirim tercihlerinizi buradan düzenleyebilirsiniz.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
}