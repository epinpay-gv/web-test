import { useState } from "react";
import { useRouter } from "next/navigation";
import { StreamerApplicationFormData, StreamerApplicationPayload } from "../streamers.types";
import { submitStreamerApplication } from "../streamers.service";

export function useStreamerApplicationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<StreamerApplicationFormData>({
    name: "",
    surname: "",
    email: "",
    phoneCode: "+90",   
    phoneNumber: "",
    channelUrl: "",
    contentType: "",
    aboutYourself: "",
    weeklyStreamDays: "",
    dailyStreamHours: "",
    instagramUrl: "",
    tiktokUrl: "",
    youtubeUrl: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof StreamerApplicationFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (error) setError(null);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload: StreamerApplicationPayload = {
        full_name: `${formData.name} ${formData.surname}`.trim(),
        email: formData.email,
        phone: `${formData.phoneCode}${formData.phoneNumber}`,  
        channelUrl: formData.channelUrl,
        contentType: formData.contentType,
        aboutYourself: formData.aboutYourself,
        weeklyStreamDays: formData.weeklyStreamDays,
        dailyStreamHours: formData.dailyStreamHours,
        social_links: JSON.stringify({
        instagram: formData.instagramUrl,
        tiktok: formData.tiktokUrl,
        youtube: formData.youtubeUrl,
        }),
      };

      const response = await submitStreamerApplication(payload);

      if (response.success) {
        router.push("/streamers/success");
      } else {
        setError(response.message || "Başvuru sırasında bir hata oluştu.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sunucuya bağlanılamadı. Lütfen tekrar deneyin.");
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