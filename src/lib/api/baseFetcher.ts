type HttpMethod = "GET" | "POST";

type FetcherOptions<TBody> = {
  method?: HttpMethod;
  body?: TBody;
  cache?: RequestCache;
};

export async function baseFetcher<
  TResponse,
  TBody = undefined
>(
  url: string,
  options: FetcherOptions<TBody> = {}
): Promise<TResponse> {
  const res = await fetch(url, {
    method: options.method ?? "GET",
    headers: { "Content-Type": "application/json" },
    body: options.body
      ? JSON.stringify(options.body)
      : undefined,
    cache: options.cache,
  });

  if (!res.ok) {
    const message = "Login request failed";
    throw { status: res.status, message };
  }

  return (await res.json()) as TResponse;
}
