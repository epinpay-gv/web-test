type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

class HttpError extends Error {
  status: number;
  statusText: string;
  data: any;

  constructor(status: number, statusText: string, data: any) {
    super(`HTTP Error: ${status} ${statusText}`);
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

async function request<T>(
  endpoint: string,
  method: RequestMethod,
  options: RequestOptions = {},
): Promise<T> {
  const { params, headers, ...rest } = options;

  // 1. Build URL with query params
  const url = new URL(
    endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`,
  );

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  // 2. Prepare headers (Auth token logic goes here)
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${getToken()}`, // Example interceptor logic
  };

  // 3. Execute Request
  const response = await fetch(url.toString(), {
    method,
    headers: { ...defaultHeaders, ...headers },
    ...rest,
  });

  // 4. Handle Response
  let data: any;
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText, data);
  }

  return data as T;
}

export const http = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, "GET", options),

  post: <T>(endpoint: string, body: any, options?: RequestOptions) =>
    request<T>(endpoint, "POST", { ...options, body: JSON.stringify(body) }),

  put: <T>(endpoint: string, body: any, options?: RequestOptions) =>
    request<T>(endpoint, "PUT", { ...options, body: JSON.stringify(body) }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, "DELETE", options),

  patch: <T>(endpoint: string, body: any, options?: RequestOptions) =>
    request<T>(endpoint, "PATCH", { ...options, body: JSON.stringify(body) }),
};
