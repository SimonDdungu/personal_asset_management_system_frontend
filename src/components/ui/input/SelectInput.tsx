import { Control, FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

type Option = {
    label: string;
    value: string;
};

interface SelectInputProps<T extends FieldValues = FieldValues> {
    name: string;
    id?: string;
    label?: string;
    placeholder?: string;
    options: Option[];
    register: UseFormRegister<any>;
    error?: FieldErrors;
    width?: string,
    height?: string,
    fontSize?: string,
    control: Control<T>;
    onChange?: (value?: any) => void;
    required?: boolean;
};

const SelectInput = <T extends FieldValues,>({name, id, label, placeholder, options, register, error, width, height, fontSize, control, onChange, required}: SelectInputProps<T>) => {
  const errorMessage = error?.[name]?.message as string | undefined;

  return (
        <div className='relative pb-2 w-full'>
            <label htmlFor={name} className='block text-xs mb-1'>
                {label}{required && <span className="text-red-600">*</span>}
             </label>

            <Controller
                name={name as Path<T>}
                control={control}
                render={({ field }) => (
                    <Select  onValueChange={(value) => {field.onChange(value); onChange?.(value);}}    value={field.value ?? ""}>
                    <SelectTrigger className={`w-full  text-sm py-2 ${errorMessage ? "border-red-500" : "border-blue-600"}`}>
                        <SelectValue placeholder={placeholder || "Select an option"} />
                    </SelectTrigger>

                    <SelectContent>
                        {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                )}
            />

            {errorMessage && <span className='absolute bottom-0 left-1 text-red-600 text-sm'>{errorMessage}</span>}

        </div>
  );
};

export default SelectInput;


{/* <div className="relative pb-2">
        <label htmlFor={name} className="block text-xs mb-1">
            {label}
        </label>

        <select
            id={id}
            {...register}
            className={`w-full h-full outline-none border rounded-lg px-2 py-1 bg-white ${errorMessage ? "border-red-500" : "border-gray-300"} ${width ? width : "w-full"} ${height ? height : "h-full"} 
                ${fontSize ? fontSize : "text-base xl:text-sm"} `}
        >
            <option value="">{placeholder || "Select an option"}</option>

            {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>

        {errorMessage && (<span className="absolute bottom-0 left-1 text-red-600 text-sm">{errorMessage}</span>)}
    </div> */}