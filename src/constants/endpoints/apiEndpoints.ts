export const API_ENDPOINTS = {
  ASSETS: {
    BASE: "/assets",
    ELECTRONICS: "/assets/electronics",
    REAL_ESTATE: "/assets/realestate",
    IMAGES: "/assets/files/images",
    DOCS: "assets/files/documents",
    TOTAL_COUNT: "assets/total/count",
    TOTAL_PHYSICAL_COUNT: "assets/physical/count",
    TOTAL_FINANCIAL_COUNT: "assets/financial/count",
    TOP_CATEGORIES: "assets/top-categories",
    TOP_PHYSICAL_CATEGORIES: "assets/physical/top-categories",
    TOP_FINANCIAL_CATEGORIES: "assets/financial/top-categories",
    LARGEST: "assets/largest",
    PHYSICAL_LARGEST: "assets/physical/largest",
    FINANCIAL_LARGEST: "assets/financial/largest",
    CATEGORIES_COUNT: "assets/categories/count",
    PHYSICAL_CATEGORIES_COUNT: "assets/physical/categories/count",
    FINANCIAL_CATEGORIES_COUNT: "assets/financial/categories/count",
    AVERAGE: "/assets/average",
    AVERAGE_PHYSICAL: "/assets/physical/average",
    AVERAGE_FINANCIAL: "/assets/financial/average",
  },
  USERS: {
    CREATE: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "auth/me"
  },
  METRICS: {
    BASE: "/metrics",
    TOTAL_NETWORTH: "/metrics/total-networth",
    TOTAL_PHYSICAL_VALUE: "/metrics/total/physical/value",
    TOTAL_FINANCIAL_VALUE: "/metrics/total/financial/value",
  }
};