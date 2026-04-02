"use client";

import { Button, Input } from "@/components/common";
import { useStreamerApplicationForm } from "@/features/streamers/hooks/useStreamerApplicationForm";
import { Envelope, Link } from "flowbite-react-icons/outline";

export default function StreamerApplicationForm() {
  const { formData, isLoading, error, handleChange, handleSubmit } =
    useStreamerApplicationForm();

  return (
    <div className="flex justify-center min-h-screen bg-(--bg-neutral-primary) border border-(--border-default) rounded-xl mt-6">
    <form
    onSubmit={handleSubmit}
    className="w-132 p-6  flex flex-col gap-4"
  >
      {/* Kişisel Bilgiler */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
        <h1 className="font-semibold">Kişisel Bilgiler</h1>
          <p className="text-(--text-body) text-xs">Kişisel bilgilerinizi girin.</p>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-(--text-heading) text-sm font-medium">
              Ad 
            </label>
            <Input
              type="text"
              name="name"
              placeholder="Adınız"
              value={formData.name}
              onChange={handleChange("name")}
              inputSize="base"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-(--text-heading) text-sm font-medium">
              Soyad 
            </label>
            <Input
              type="text"
              name="surname"
              placeholder="Soyadınız"
              value={formData.surname}
              onChange={handleChange("surname")}
              inputSize="base"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-(--text-heading) text-sm font-medium">
              Email 
            </label>
            <Input
              type="text"
              name="email"
              placeholder="Mail adresiniz"
              leftIcon={<Envelope />}
              value={formData.email}
              onChange={handleChange("email")}
              inputSize="base"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-(--text-heading) text-sm font-medium">
              Telefon numarası
            </label>
            <Input
              type="text"
              name="birthDate"
              placeholder="+90"
              value={formData.birthDate}
              onChange={handleChange("birthDate")}
              inputSize="base"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Kanal Bilgileri */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-(--text-heading) text-sm font-semibold">Kanal bilgileri</h3>
          <p className="text-(--text-body) text-xs">Kanal bilgilerini gir.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-medium">Platform seçimi</label>
          <p className="text-(--text-body) text-xs">
            En az bir platform seçip girişini yapmanız gerekmektedir.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-medium">Twitch kanal linki</label>
          <Input
            type="text"
            name="channelUrl"
            placeholder="twitch.tv/ kanal adı"
            leftIcon={<Link />}
            value={formData.channelUrl}
            onChange={handleChange("channelUrl")}
            inputSize="base"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-medium">Kick kanal linki</label>
          <Input
            type="text"
            name="contentType"
            placeholder="kick.com/ kanal adı"
            leftIcon={<Link />}
            value={formData.contentType}
            onChange={handleChange("contentType")}
            inputSize="base"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-medium">Youtube kanal linki</label>
          <Input
            type="text"
            name="youtubeUrl"
            placeholder="youtube.com/ kanal adı"
            leftIcon={<Link />}
            value={formData.youtubeUrl}
            onChange={handleChange("youtubeUrl")}
            inputSize="base"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-medium">
            Yayın içeriği türü nedir?
          </label>
          <textarea
            name="aboutYourself"
            placeholder="Örn: Gaming, Teknoloji, Spor"
            value={formData.aboutYourself}
            onChange={handleChange("aboutYourself")}
            disabled={isLoading}
            rows={3}
            className="w-full rounded-(--radius-base) border border-(--border-default) bg-(--bg-neutral-primary-medium) text-(--text-heading) text-sm px-3 py-2 resize-none placeholder:text-(--text-body) focus:outline-none focus:border-(--border-default-strong)"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-medium">
            Hedef kitlenizi tanımlayın
          </label>
          <textarea
            name="weeklyStreamDays"
            placeholder="Örn: 30-40 yaş oyun sever kitlesine hitap ediyorum..."
            value={formData.weeklyStreamDays}
            onChange={handleChange("weeklyStreamDays")}
            disabled={isLoading}
            rows={4}
            className="w-full rounded-(--radius-base) border border-(--border-default) bg-(--bg-neutral-primary-medium) text-(--text-heading) text-sm px-3 py-2 resize-none placeholder:text-(--text-body) focus:outline-none focus:border-(--border-default-strong)"
          />
        </div>
      </div>

      {/* Yayın Sıklığı */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-(--text-body) text-xs">
            Haftada kaç gün ve günde ortalama kaç saat yayın yapıyorsunuz?
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-(--text-heading) text-sm font-medium">Haftalık yayın günü</label>
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
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-(--text-heading) text-sm font-medium">Günlük ortalama saat</label>
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
          </div>
        </div>
      </div>

      {/* Sosyal Medya */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-(--text-heading) text-sm font-semibold">Sosyal medya bağlantıları</h3>
          <p className="text-(--text-body) text-xs">
            Sosyal medya bağlantılarını ekle. En az 1 sosyal medya gir.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-(--text-heading) text-sm font-medium">Instagram</label>
            <Input
              type="text"
              name="instagramUrl"
              placeholder="instagram.com/ kullanıcı adı"
              value={formData.instagramUrl}
              onChange={handleChange("instagramUrl")}
              inputSize="base"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-(--text-heading) text-sm font-medium">TikTok</label>
            <Input
              type="text"
              name="tiktokUrl"
              placeholder="tiktok.com/ kullanıcı adı"
              value={formData.tiktokUrl}
              onChange={handleChange("tiktokUrl")}
              inputSize="base"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-(--text-heading) text-sm font-medium">Youtube</label>
          <Input
            type="text"
            name="youtubeUrl"
            placeholder="instagram.com/ kullanıcı adı"
            value={formData.youtubeUrl}
            onChange={handleChange("youtubeUrl")}
            inputSize="base"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Form Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/40 rounded-(--radius-base) px-3 py-2">
          <p className="text-red-500 text-xs text-center font-medium leading-tight">{error}</p>
        </div>
      )}

      {/* Submit */}
      <div>
        <Button
          variant="brand"
          text={isLoading ? "Gönderiliyor..." : "Başvur"}
          type="submit"
          disabled={isLoading}
          className="py-3 px-6 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>
    </form>
    </div>
  );
}