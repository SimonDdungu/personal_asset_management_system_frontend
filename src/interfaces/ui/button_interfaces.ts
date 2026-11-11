import { type LucideIcon } from "lucide-react";

export interface ButtonProps {
    icon?: LucideIcon;
    iconSize?: number,
    label: string,
    width?: string,
    height?: string,
    link?: string,
    onClick?: (value?: any) => void,
    button?: boolean
}