import createError from "../utils/createError";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(
  url,
  {
    method = "GET",
    body,
    headers = {},
    credentials = "include", 
  } = {}
) {
  const config = {
    method,
    credentials,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(BASE_URL + url, config);

if (response.status === 401) {
  throw createError(response.status, "Chưa đăng nhập", "UNAUTHORIZED");
}


  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw createError(response.status, errorData.error || "lỗi api", "API FECTH ERROR");
  }

  return response.json();
}
