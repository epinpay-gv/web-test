import { useState } from "react";
import { useRouter } from "next/navigation";
import { StreamerApplicationFormData, StreamerApplicationPayload } from "../types/application.type";
import { submitStreamerApplication } from "../service/application.service";



export function useStreamerApplicationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<StreamerApplicationFormData>({
    name: "",
    surname: "",
    email: "",
    phoneCode: "+90",
    phoneNumber: "",
    twitchUrl: "",
    kickUrl: "",
    youtubeChannelUrl: "",
    contentType: "",
    targetAudience: "",
    weeklyStreamDays: "",
    dailyStreamHours: "",
    instagramUrl: "",
    tiktokUrl: "",
    youtubeSocialUrl: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Curried yapı — form componentindeki handleChange("field") kullanımıyla uyumlu
  const handleChange = (field: keyof StreamerApplicationFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (error) setError(null);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData:", formData);
    setIsLoading(true);
    setError(null);

    const platform = formData.twitchUrl
      ? "TWITCH"
      : formData.kickUrl
      ? "KICK"
      : formData.youtubeChannelUrl
      ? "YOUTUBE"
      : null;

    const stream_url = formData.twitchUrl
      ? `https://twitch.tv/${formData.twitchUrl}`
      : formData.kickUrl
      ? `https://kick.com/${formData.kickUrl}`
      : formData.youtubeChannelUrl
      ? `https://youtube.com/${formData.youtubeChannelUrl}`
      : "";

    if (!platform) {
      setError("En az bir platform kanal linki giriniz.");
      setIsLoading(false);
      return;
    }

    const socialCount = [
      formData.instagramUrl,
      formData.tiktokUrl,
      formData.youtubeSocialUrl,
    ].filter(Boolean).length;

    if (socialCount === 0) {
      setError("En az bir sosyal medya bağlantısı giriniz.");
      setIsLoading(false);
      return;
    }

    try {
      const payload: StreamerApplicationPayload = {
        platform,
        stream_url,
        full_name: `${formData.name} ${formData.surname}`.trim(),
        email: formData.email,
        phone: `${formData.phoneCode}${formData.phoneNumber}`,
        content_type: formData.contentType,
        target_audience: formData.targetAudience,
        streaming_schedule: `Haftada ${formData.weeklyStreamDays} gün, günde ${formData.dailyStreamHours} saat`,
        ...(formData.instagramUrl && {
          instagram_url: `https://instagram.com/${formData.instagramUrl}`,
        }),
        ...(formData.tiktokUrl && {
          tiktok_url: `https://tiktok.com/${formData.tiktokUrl}`,
        }),
        ...(formData.youtubeSocialUrl && {
          youtube_url: `https://youtube.com/${formData.youtubeSocialUrl}`,
        }),
      };
      console.log("payload:", payload);

      const response = await submitStreamerApplication(payload);

        console.log("response:", response); 
      if (response.success) {
        router.push("/streamers/success");
      } else {
        setError(response.message || "Başvuru sırasında bir hata oluştu.");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Sunucuya bağlanılamadı. Lütfen tekrar deneyin."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  };
}