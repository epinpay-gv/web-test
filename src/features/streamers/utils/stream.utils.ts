/**
 * Autoplay'i kapatmak ve sesi kısmak için URL'ye uygun parametreleri ekler.
 * @param url Orijinal yayın URL'si
 * @returns Optimize edilmiş URL
 */
export const getOptimizedStreamUrl = (url: string): string => {
  if (!url) return "";

  try {
    const urlObj = new URL(url);
    const params = urlObj.searchParams;

    if (url.includes("twitch.tv")) {
      // Twitch: autoplay=false, muted=true
      params.set("autoplay", "false");
      params.set("muted", "true");
    } else if (
      url.includes("youtube.com") ||
      url.includes("youtu.be") ||
      url.includes("youtube-nocookie.com") ||
      url.includes("kick.com")
    ) {
      // YouTube/Kick: autoplay=0, mute=1
      params.set("autoplay", "0");
      params.set("mute", "1");
    }

    return urlObj.toString();
  } catch (e) {
    // Geçersiz URL durumunda manuel ekleme (fallback)
    const separator = url.includes("?") ? "&" : "?";
    if (url.includes("twitch.tv")) return `${url}${separator}autoplay=false&muted=true`;
    if (url.includes("youtube") || url.includes("kick")) return `${url}${separator}autoplay=0&mute=1`;
    return url;
  }
};
