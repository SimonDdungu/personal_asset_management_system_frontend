import React from 'react'
import { FieldErrors } from "react-hook-form";

interface NumberSearchProps {
    name: string,
    placeholder?: string,
    label?: string,
    width?: string,
    height?: string,
    fontSize?: string,
    onChange?: (value: any) => void
    max?: number
}
const NumberSearchInput = ({name, placeholder, label, width, height, fontSize, max, onChange}: NumberSearchProps) => {

    return (
        <div className='relative pb-2'>
            <label htmlFor={name} className='block text-xs mb-1'>
                {label}
            </label>

            <input 
                type='text'
                inputMode="decimal"
                name={name}
                maxLength={max}
                onChange = {(e) => {
                    const value = e.target.value.replace(/[^\d.]/g, "").replace(/^(\d*\.?\d{0,2}).*$/, "$1");
                    e.target.value = value;
                    onChange?.(value === "" ? undefined : Number(value));
                }}
                placeholder={placeholder}
                className={`bg-white outline-none leading-normal border placeholder:text-gray-600 placeholder:text-xs border-gray-300 rounded-lg px-2 py-2 ${width ? width : "w-full"} ${height ? height : ""} ${fontSize ? fontSize : "text-base xl:text-sm"} `}
            />

        </div>
  )
}

export default NumberSearchInput