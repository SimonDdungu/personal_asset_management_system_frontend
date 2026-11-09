import axios from "axios";

export function logApiError(context: string, error: unknown) {
  console.error(`[${context}] Request failed`);

  if (axios.isAxiosError(error)) {
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("URL:", error.config?.url);
    console.error("Method:", error.config?.method);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response data:", error.response.data);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request sent, but no response received:", error.request);
    } else {
      console.error("Request setup failed:", error.message);
    }
  } else {
    console.error("Unexpected error:", error);
  }
}