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

  const finalHeaders = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const res = await fetch(finalUrl, {
    method: options.method ?? "GET",
    headers: finalHeaders,
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: options.cache,
    credentials: 'include', 
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = errorData.message || msg;
    throw { status: res.status, message };
  }

  return (await res.json()) as TResponse;
}