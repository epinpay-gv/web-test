"use client";

import { Button, Input } from "@/components/common";
import { useStreamerApplicationForm } from "@/features/streamers/hooks/useStreamerApplicationForm";
import { Envelope } from "flowbite-react-icons/outline";
import { PHONE_CODES } from "@/features/streamers/utils/phone-code";

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 w-64">
      <label className="text-(--text-heading) text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

function PlatformInput({
  prefix, name, placeholder, value, onChange, disabled,
}: {
  prefix: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center w-64 h-10 rounded-(--radius-base) border border-(--border-default) bg-(--bg-neutral-primary-medium) overflow-hidden text-sm focus-within:border-(--border-default-strong) transition-colors">
      <span className="px-3 text-(--text-body) whitespace-nowrap border-r border-(--border-default) bg-(--bg-neutral-primary-soft) h-full flex items-center select-none">
        {prefix}
      </span>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="flex-1 bg-transparent px-3 text-(--text-heading) placeholder:text-(--text-body) outline-none disabled:opacity-50"
      />
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-(--text-heading) text-[16px] font-semibold">{title}</h3>
      <p className="text-(--text-body) text-[14px]">{description}</p>
    </div>
  );
}

export default function StreamerApplicationForm() {
  const { formData, isLoading, error, handleChange, handleSubmit } =
    useStreamerApplicationForm();

  return (
    <div className="flex justify-center min-h-screen bg-(--bg-neutral-primary) border border-(--border-default) rounded-xl mt-6">
      <form onSubmit={handleSubmit} className="w-132 p-6 flex flex-col gap-4">

        {/* Kişisel Bilgiler */}
        <SectionHeader title="Kişisel Bilgiler" description="Kişisel bilgilerinizi girin." />

        <div className="flex gap-3">
          <FormField label="Ad">
            <Input
              type="text"
              name="name"
              placeholder="Adınız"
              value={formData.name}
              onChange={handleChange("name")}
              inputSize="base"
              disabled={isLoading}
              rightIcon={<span />}
              className="w-64 h-10 rounded-2xl"
            />
          </FormField>
          <FormField label="Soyad">
            <Input
              type="text"
              name="surname"
              placeholder="Soyadınız"
              value={formData.surname}
              onChange={handleChange("surname")}
              inputSize="base"
              disabled={isLoading}
              rightIcon={<span />}
              className="w-64 h-10 rounded-2xl"
            />
          </FormField>
        </div>

        <div className="flex gap-3">
          <FormField label="Email">
            <Input
              type="email"
              name="email"
              placeholder="Mail adresiniz"
              leftIcon={<Envelope width={13.33} height={10.6} />}
              value={formData.email}
              onChange={handleChange("email")}
              inputSize="base"
              disabled={isLoading}
              rightIcon={<span />}
              className="w-64 h-10 rounded-2xl"
            />
          </FormField>
          <FormField label="Telefon numarası">
            <div className="flex items-center w-64 h-10 rounded-(--radius-base) border border-(--border-default) bg-(--bg-neutral-primary-medium) overflow-hidden text-sm focus-within:border-(--border-default-strong) transition-colors">
              <select
                value={formData.phoneCode}
                onChange={handleChange("phoneCode")}
                disabled={isLoading}
                className="h-full bg-(--bg-neutral-primary-soft) border-r border-(--border-default) text-(--text-body) text-sm px-2 focus:outline-none disabled:opacity-50 shrink-0"
              >
                {PHONE_CODES.map(({ label, value }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <input
                type="text"
                name="phoneNumber"
                placeholder="5XX XXX XX XX"
                value={formData.phoneNumber}
                onChange={handleChange("phoneNumber")}
                disabled={isLoading}
                className="flex-1 bg-transparent px-3 text-(--text-heading) placeholder:text-(--text-body) outline-none disabled:opacity-50 rounded-2xl"
              />
            </div>
          </FormField>
        </div>

        {/* Kanal Bilgileri */}
        <SectionHeader title="Kanal bilgileri" description="Kanal bilgilerini gir." />

        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-[16px] font-semibold">Platform seçimi</label>
          <p className="text-(--text-body) text-[14px]">
            En az bir platform seçip girişini yapmanız gerekmektedir.
          </p>
        </div>

        <FormField label="Twitch kanal linki">
          <PlatformInput
            prefix="twitch.tv/"
            name="twitchUrl"
            placeholder="kanal adı"
            value={formData.twitchUrl}
            onChange={handleChange("twitchUrl")}
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Kick kanal linki">
          <PlatformInput
            prefix="kick.com/"
            name="kickUrl"
            placeholder="kanal adı"
            value={formData.kickUrl}
            onChange={handleChange("kickUrl")}
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Youtube kanal linki">
          <PlatformInput
            prefix="youtube.com/"
            name="youtubeChannelUrl"
            placeholder="kanal adı"
            value={formData.youtubeChannelUrl}
            onChange={handleChange("youtubeChannelUrl")}
            disabled={isLoading}
          />
        </FormField>

        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-semibold">
            Yayın içerik türünüz nedir?
          </label>
          <textarea
            name="contentType"
            placeholder="Örn: Gaming, Teknoloji, Spor"
            value={formData.contentType}
            onChange={handleChange("contentType")}
            disabled={isLoading}
            className="w-132 h-24.5 rounded-(--radius-base) border border-(--border-default-medium) bg-(--bg-neutral-primary-medium) text-(--text-heading) text-sm p-3.5 resize-none placeholder:text-(--text-body) focus:outline-none focus:border-(--border-default-strong)"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-semibold">
            Hedef kitlenizi tanımlayın
          </label>
          <textarea
            name="targetAudience"
            placeholder="Örn: 30-40 yaş oyun sever kitlesine hitap ediyorum..."
            value={formData.targetAudience}
            onChange={handleChange("targetAudience")}
            disabled={isLoading}
            className="w-132 h-24.5 rounded-(--radius-base) border border-(--border-default-medium) bg-(--bg-neutral-primary-medium) text-(--text-heading) text-sm p-3.5 resize-none placeholder:text-(--text-body) focus:outline-none focus:border-(--border-default-strong)"
          />
        </div>

        {/* Yayın Sıklığı */}
        <p className="text-sm font-[12px]">
          Haftada kaç gün ve günde ortalama kaç saat yayın yapıyorsunuz?
        </p>

        <div className="flex gap-3">
          <FormField label="Haftalık yayın günü">
            <select
              value={formData.weeklyStreamDays}
              onChange={handleChange("weeklyStreamDays")}
              disabled={isLoading}
              className="w-full rounded-(--radius-base) border border-(--border-default) bg-(--bg-neutral-primary-medium) text-(--text-heading) text-sm px-3 h-10 focus:outline-none focus:border-(--border-default-strong)"
            >
              <option value="">Gün sayısı</option>
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <option key={d} value={d}>{d} gün</option>
              ))}
            </select>
          </FormField>
          <FormField label="Günlük ortalama saat">
            <select
              value={formData.dailyStreamHours}
              onChange={handleChange("dailyStreamHours")}
              disabled={isLoading}
              className="w-full rounded-(--radius-base) border border-(--border-default) bg-(--bg-neutral-primary-medium) text-(--text-heading) text-sm px-3 h-10 focus:outline-none focus:border-(--border-default-strong)"
            >
              <option value="">Saat sayısı</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((h) => (
                <option key={h} value={h}>{h} saat</option>
              ))}
            </select>
          </FormField>
        </div>

        {/* Sosyal Medya */}
        <SectionHeader
          title="Sosyal medya bilgileri"
          description="Sosyal medya bağlantılarını ekle. En az 1 sosyal medya gir."
        />

        <div className="flex gap-3">
          <FormField label="Instagram">
            <PlatformInput
              prefix="instagram.com/"
              name="instagramUrl"
              placeholder="kullanıcı adı"
              value={formData.instagramUrl}
              onChange={handleChange("instagramUrl")}
              disabled={isLoading}
            />
          </FormField>
          <FormField label="TikTok">
            <PlatformInput
              prefix="tiktok.com/"
              name="tiktokUrl"
              placeholder="kullanıcı adı"
              value={formData.tiktokUrl}
              onChange={handleChange("tiktokUrl")}
              disabled={isLoading}
            />
          </FormField>
        </div>

        <FormField label="Youtube">
          <PlatformInput
            prefix="youtube.com/"
            name="youtubeSocialUrl"
            placeholder="kullanıcı adı"
            value={formData.youtubeSocialUrl}
            onChange={handleChange("youtubeSocialUrl")}
            disabled={isLoading}
          />
        </FormField>

        {error && (
          <div className="bg-red-500/10 border border-red-500/40 rounded-(--radius-base) px-3 py-2">
            <p className="text-red-500 text-xs text-center font-medium leading-tight">{error}</p>
          </div>
        )}

        <div>
          <Button
            variant="brand"
            text={isLoading ? "Gönderiliyor..." : "Başvur"}
            padding="xs"
            type="submit"
            arrows={{ right: true }}
            disabled={isLoading}
            className="font-semibold w-21 h-10 rounded-2x max-w-21"
          />
        </div>

      </form>
    </div>
  );
}