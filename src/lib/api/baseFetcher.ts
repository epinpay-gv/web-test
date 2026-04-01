type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

type FetcherOptions<TBody> = {
  method?: HttpMethod;
  body?: TBody;
  cache?: RequestCache;
  headers?: Record<string, string>; 
};

export async function baseFetcher<TResponse, TBody = undefined>(
  url: string,
  options: FetcherOptions<TBody> = {},
  msg: string = "Request failed"
): Promise<TResponse> {
  const finalUrl = url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_SITE_URL}${url}`;

  // Kimlik doğrulama token'ını bul
  let token: string | undefined = undefined;
  
  if (typeof window !== "undefined") {
    // Çerezden oku 
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
    
    if (cookieToken) {
      token = cookieToken;
    } else {
      // Çerez yoksa localStorage'a bak
      try {
        const authData = localStorage.getItem('auth-storage') || sessionStorage.getItem('auth-storage');
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
    "EP-Language" : "", 
    "EP-Currency" : "",
    ...options.headers,
  };

  if (token) {
    finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(finalUrl, {
    method: options.method ?? "GET",
    headers: finalHeaders,
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: options.cache,
    credentials: "include", // Çerezleri gönder
  });

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