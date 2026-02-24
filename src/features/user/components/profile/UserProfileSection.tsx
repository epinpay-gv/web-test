"use client";

import { useState } from "react";
import { Button, Input } from "@/components/common";
import { Modal } from "@/components/common/Modal/Modal";
import { ExclamationCircle } from "flowbite-react-icons/outline";

type Props = {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        referralCode: string;
        isEmailVerified: boolean;
    };
    content: {
        title: string;
        description: string;
    };
};

function SectionHeader({ title, description }: { title: string; description: string }) {
    return (
        <div className="pt-4">
            <h2 className="font-semibold text-(--text-heading)">{title}</h2>
            <p className="text-sm text-(--text-body)">{description}</p>
        </div>
    );
}

function FormField({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{label}</label>
            {children}
        </div>
    );
}

const INPUT_CLASS = "border-(--border-default-medium) lg:w-[256px] lg:h-[40px] rounded-[12px] px-2.5 ";

export default function UserProfileSection({ user, content }: Props) {
    const [form, setForm] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    });

    const [passwordForm, setPasswordForm] = useState({
        password: "",
        passwordRepeat: "",
    });

    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

    const isProfileLocked = user.isEmailVerified;

    const handleChange =
        (field: keyof typeof form) =>
            (e: React.ChangeEvent<HTMLInputElement>) =>
                setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handlePasswordChange =
        (field: keyof typeof passwordForm) =>
            (e: React.ChangeEvent<HTMLInputElement>) =>
                setPasswordForm((prev) => ({ ...prev, [field]: e.target.value }));

    const isPasswordValid =
        passwordForm.password.length > 0 &&
        passwordForm.password === passwordForm.passwordRepeat;

    return (
        <div className="flex flex-col">

            {/* KİŞİSEL BİLGİLER */}
            <div>
                <SectionHeader title={content.title} description={content.description} />

                <div className="flex flex-col gap-4 mt-4 items-start">

                    {/* Satır 1: Ad - Soyad */}
                    <div className="flex gap-4">
                        <FormField label="Ad">
                            <Input
                                value={form.firstName}
                                onChange={handleChange("firstName")}
                                disabled={isProfileLocked}
                                rightIcon={<></>}
                                className={INPUT_CLASS}
                            />
                        </FormField>

                        <FormField label="Soyad">
                            <Input
                                value={form.lastName}
                                onChange={handleChange("lastName")}
                                disabled={isProfileLocked}
                                rightIcon={<></>}
                                className={INPUT_CLASS}
                            />
                        </FormField>
                    </div>

                    {/* Satır 2: Email - Referans Kodu */}
                    <div className="flex gap-4 items-start">
                        <FormField label="Email">
                            <Input
                                value={form.email}
                                onChange={handleChange("email")}
                                disabled={isProfileLocked}
                                rightIcon={<></>}
                                className={INPUT_CLASS}
                            />
                            {!user.isEmailVerified ? (
                                <div className="flex flex-col gap-2.5">
                                    <p className="text-xs text-(--text-fg-warning)">E-posta henüz doğrulanmamış.</p>
                                    <Button
                                        text="E-posta adresini doğrula"
                                        variant="warning"
                                        textSize="sm"
                                        className="w-[196px] h-[40px] rounded-[12px]"
                                        onClick={() => setIsVerifyModalOpen(true)}
                                    />

                                </div>
                            ) : (
                                <p className="text-xs text-(--text-fg-success-strong)">E-posta doğrulanmış.</p>
                            )}
                        </FormField>

                        <FormField label="Referans Kodu">
                            <Input
                                value={user.referralCode}
                                rightIcon={<></>}
                                className={INPUT_CLASS}
                            />
                        </FormField>
                    </div>

                </div>

                {!isProfileLocked && (
                    <Button
                        text="Kaydet"
                        variant="brand"
                        textSize="sm"
                        className="max-w-[79px] h-[40px] my-2"

                    />
                )}
            </div>

            {/* ŞİFRE YENİLE */}
            <div>
                <SectionHeader title="Şifre Yenile" description="Şifrenizi buradan değiştirebilirsiniz." />

                <div className="flex gap-4 my-4">
                    <FormField label="Şifre">
                        <Input
                            type="password"
                            placeholder="Yeni şifre girin"
                            value={passwordForm.password}
                            onChange={handlePasswordChange("password")}
                            rightIcon={<></>}
                            className={INPUT_CLASS}
                        />
                    </FormField>

                    <FormField label="Şifre tekrarı">
                        <Input
                            type="password"
                            placeholder="Yeni şifre girin"
                            value={passwordForm.passwordRepeat}
                            onChange={handlePasswordChange("passwordRepeat")}
                            rightIcon={<></>}
                            className={INPUT_CLASS}
                        />
                    </FormField>
                </div>

                <Button
                    text="Şifre Güncelle"
                    variant="dark"
                    padding="base"
                    size="full"
                    textSize="sm"
                    className="max-w-[126px] h-[40px]"
                    disabled={!isPasswordValid}
                />
            </div>

            {/* MODAL */}
            <Modal
                open={isVerifyModalOpen}
                onClose={() => setIsVerifyModalOpen(false)}
                theme="popup"
                size="sm"
                icon={<ExclamationCircle className="w-10 h-10" />}
                title="Doğrulama Gönderildi"
                description={`${user.email} adresine doğrulama e-postası gönderildi. E posta kutunuzu kontrol ediniz.`}
                confirmText="Anladım"
                onConfirm={() => setIsVerifyModalOpen(false)}
            />

        </div>
    );
}