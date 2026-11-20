import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { Ellipsis } from "lucide-react"

export interface PopoverOption {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  variant?: "default" | "destructive"
  disabled?: boolean
  className?: string;
}

interface ActionPopoverProps {
  options: PopoverOption[]
}

export function ActionPopover({ options }: ActionPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="absolute top-1 right-1 bg-blue-900/70 hover:bg-blue-900/90 transition-colors duration-200 rounded-lg z-50 p-1 cursor-pointer">
            <Ellipsis className="text-white" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-48 p-1 z-999" align="end">
        <div className="flex flex-col">
          {options.map((option, index) => (
            <button
                key={index}
                type="button"
                disabled={option.disabled}
                onClick={option.onClick}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-left hover:bg-gray-200 ${option.disabled ? "cursor-not-allowed" : "cursor-pointer"} 
                  ${option.className || ""} focus:outline-none focus:ring-0 ${option.disabled ? "opacity-50" : "opacity-100"}`}
            >
                {option.icon}
                {option.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}