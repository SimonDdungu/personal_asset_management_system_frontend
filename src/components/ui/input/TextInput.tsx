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
    required?: boolean;
    error?: FieldErrors,
    onChange?: (value: any) => void
}

const TextInput = ({name, id, placeholder, label, width, height, fontSize, register, error, onChange, required}: TextInputProps) => {
     const errorMessage = error?.[name]?.message as string | undefined;

    return (
        <div className='relative pb-4 w-full'>
            <label htmlFor={name} className='block text-xs mb-1'>
                {label}{required && <span className="text-red-600">*</span>}
            </label>

            <input 
                type='text'
                name={name}
                {...register(name, { onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value) })}
                id={id}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                className={`outline-none border placeholder:text-gray-600 placeholder:text-sm ${errorMessage ? "border-red-500" : "border-blue-600"} rounded-lg px-2 py-2 ${width ? width : "w-full"} ${height ? height : ""} ${fontSize ? fontSize : "text-base xl:text-sm"} `}
            />

            {errorMessage && <span className='absolute bottom-0 left-1 text-red-600 text-xs'>{errorMessage}</span>}
        </div>
  )
}

export default TextInput