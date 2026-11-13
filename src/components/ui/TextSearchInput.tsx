
interface TextSearchProps {
    name: string,
    placeholder?: string,
    label?: string,
    width?: string,
    height?: string,
    fontSize?: string,
    onChange?: (value: any) => void
}

const TextSearchInput = ({name, placeholder, label, width, height, fontSize, onChange}: TextSearchProps) => {

    return (
        <div className='relative pb-2'>
            <label htmlFor={name} className='block text-xs mb-1'>
                {label}
            </label>

            <input 
                type='text'
                name={name}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                className={`bg-white outline-none border placeholder:text-gray-600 placeholder:text-xs border-gray-300 rounded-lg px-2 py-2 ${width ? width : "w-full"} ${height ? height : ""} ${fontSize ? fontSize : "text-base xl:text-sm"} `}
            />

        </div>
  )
}

export default TextSearchInput