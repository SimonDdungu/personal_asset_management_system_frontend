import {
  LayoutDashboard,
  Boxes,
  Building2,
  Wallet,
  FileText,
  Settings,
} from "lucide-react";

export const physicalAssetMenu = [
  { name: "Analytics", href: "/assets/physical/analytics" },
  { name: "Electronics", href: "/assets/physical/electronics" },
  { name: "Furniture", href: "/assets/physical/furniture" },
  { name: "Houses", href: "/assets/physical/houses" },
  { name: "Land", href: "/assets/physical/land" },
  { name: "Machinery & Equipment", href: "/assets/physical/machinery" },
  { name: "Other Physical Assets", href: "/assets/physical/other" },
  { name: "Real Estate", href: "/assets/physical/real-estate" },
  { name: "Vehicles", href: "/assets/physical/vehicles" },
];

export const financialAssetMenu = [
  { name: "Analytics", href: "/assets/financial/analytics" },
  { name: "Bank Accounts", href: "/assets/financial/bank-accounts" },
  { name: "Cash", href: "/assets/financial/cash" },
  { name: "Insurance Policies", href: "/assets/financial/insurance" },
  { name: "Investments", href: "/assets/financial/investments" },
  { name: "Liabilities", href: "/assets/financial/liabilities" },
  { name: "Loans", href: "/assets/financial/loans" },
  { name: "Other Financial Assets", href: "/assets/financial/other" },
  { name: "Retirement Funds", href: "/assets/financial/retirement" },
  { name: "Savings", href: "/assets/financial/savings" },
  { name: "Stocks", href: "/assets/financial/stocks" },
];

export const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Physical Assets", icon: Building2, children: physicalAssetMenu },
  { name: "Financial Assets", icon: Wallet, children: financialAssetMenu },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];