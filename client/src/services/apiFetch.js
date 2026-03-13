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
      ...headers
    }
  };

  // Nếu body là FormData thì giữ nguyên
  if (body instanceof FormData) {
    config.body = body;
  } 
  // Nếu body là object thì convert JSON
  else if (body) {
    config.headers["Content-Type"] = "application/json";
    config.body = JSON.stringify(body);
  }

  const response = await fetch(BASE_URL + url, config);

  if (response.status === 401) {
    window.location.href = "auth";
    throw createError(response.status, "Chưa đăng nhập", "UNAUTHORIZED");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw createError(
      response.status,
      errorData.error || "Lỗi API",
      "API_FETCH_ERROR"
    );
  }

  return response.json();
}