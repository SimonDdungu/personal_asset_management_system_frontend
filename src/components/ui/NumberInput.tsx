import React from 'react'
import { FieldErrors } from "react-hook-form";

interface TextInputProps {
    name: string,
    id?: string,
    placeholder?: string,
    label?: string,
    width?: string,
    height?: string,
    fontSize?: string,
    register?: any,
    error?: FieldErrors,
    max?: number
}

const NumberInput = ({name, id, placeholder, label, width, height, fontSize, register, error, max}: TextInputProps) => {
     const errorMessage = error?.[name]?.message as string | undefined;

    return (
        <div className='relative pb-2 w-full'>
            <label htmlFor={name} className='block text-xs mb-1'>
                {label}
            </label>

            <input 
                type='text'
                inputMode="decimal"
                name={name}
                maxLength={max}
                {...register(name, {
                    setValueAs: (value: string) => value === "" ? undefined : Number(value),
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        e.target.value = e.target.value.replace(/[^\d.]/g, "").replace(/^(\d*\.?\d{0,2}).*$/, "$1");
                    }
                })}
                id={id}
                placeholder={placeholder}
                className={`outline-none leading-normal border placeholder:text-gray-600 ${errorMessage ? "border-red-500" : "border-gray-300"} rounded-lg px-2 py-2 ${width ? width : "w-full"} ${height ? height : ""} ${fontSize ? fontSize : "text-base xl:text-sm"} `}
            />

            {errorMessage && <span className='absolute bottom-0 left-1 text-red-600 text-sm'>{errorMessage}</span>}
        </div>
  )
}

export default NumberInput