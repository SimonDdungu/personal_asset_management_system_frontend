"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface FormPasswordProps {
  name: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  fontSize?: string;
}

export function PasswordInput({name, label, placeholder, autoComplete = "new-password", required, fontSize}: FormPasswordProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
         <div className="relative pb-4 w-full">
          <label htmlFor={name} className={`${fieldState.error ? "text-red-600" : "text-black"} text-xs`}>{label}<span className="text-red-600">{required ? "*" : ""}</span></label>

          <div className="w-full flex relative">
            <input
              {...field}
              id={name}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              autoComplete={autoComplete}
              className={`w-full outline-none rounded-lg pl-3 pr-4 py-2 border  ${fieldState.error ? "border-red-400" : "border-blue-400"} ${fontSize ?? "text-base xl:text-sm"}`}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
              {showPassword ? <Eye size={15} /> : <EyeOff size={15}/>}
            </button>
          </div>

           {fieldState.error && (
            <span className="text-red-600 absolute bottom-0 left-0 text-xs">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}