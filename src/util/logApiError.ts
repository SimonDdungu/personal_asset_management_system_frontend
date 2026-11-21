import axios from "axios";

export function logApiError(context: string, error: unknown) {
  if (axios.isAxiosError(error)) {
    console.error(`[${context}] API Error`, {
      message: error.message,
      code: error.code,
      method: error.config?.method?.toUpperCase(),
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      response: error.response?.data,
      headers: error.response?.headers,
      request: error.request ? "Request sent, no response received" : undefined,
      stack: error.stack,
    });

    return;
  }

  if (error instanceof Error) {
    console.error(`[${context}] Unexpected Error`, {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    return;
  }

  console.error(`[${context}] Unknown Error`, error);
}