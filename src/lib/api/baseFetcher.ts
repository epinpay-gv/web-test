type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

async function getCookie(name: string): Promise<string | undefined> {
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      return cookieStore.get(name)?.value;
    } catch (e) {
      console.warn(`[baseFetcher] Could not access cookies on server for ${name}`);
      return undefined;
    }
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

type FetcherOptions<TBody> = {
  method?: HttpMethod;
  body?: TBody;
  cache?: RequestCache;
  headers?: Record<string, string>;
};

export async function baseFetcher<TResponse, TBody = undefined>(
  url: string,
  options: FetcherOptions<TBody> = {},
  msg: string = "Request failed",
): Promise<TResponse> {
  // const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

  // const finalUrl = url.startsWith("http") ? url : `${apiUrl}${url}`;
  const finalUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  // Kimlik doğrulama token'ını bul
  let token: string | undefined = undefined;

  if (typeof window === "undefined") {
    // Server-side: next/headers kullan
    token = await getCookie("accessToken");
  } else {
    // Client-side: document.cookie (veya localStorage) kullan
    const cookieToken = await getCookie("accessToken");

    if (cookieToken) {
      token = cookieToken;
    } else {
      // Çerez yoksa localStorage'a bak
      try {
        const authData =
          localStorage.getItem("auth-storage") ||
          sessionStorage.getItem("auth-storage");
        if (authData) {
          const parsed = JSON.parse(authData);
          token = parsed.state?.token || parsed.token || parsed.user?.token;
        }
      } catch (e) {
        // TODO : Buraya error toastify eklenecek
      }
    }
  }

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "EP-Language": "",
    "EP-Currency": "",
    "epinpay-language": "tr-TR",
    "x-currency-code": (await getCookie("currency")) ?? "TRY",
    "x-api-key": "AIzaSyBFUsWEISiImLREu2usXWXIjOpKowiGwjE",
    ...options.headers,
  };

  if (token) {
    finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    console.log("URL : ", finalUrl);
    res = await fetch(finalUrl, {
      method: options.method ?? "GET",
      headers: finalHeaders,
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: options.cache,
      credentials: "include", // Çerezleri gönder
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("[baseFetcher] Fetch fundamentally failed (network, invalid url):", {
      originalUrl: url,
      finalUrl,
      // apiUrl,
      errorMsg: error?.message,
      cause: error?.cause?.message
    });
    throw error;
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = errorData.message || msg;    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = new Error(message) as any;
    error.status = res.status;    
    throw error;
  }

  return (await res.json()) as TResponse;
}
