"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, X } from "lucide-react";

interface ImagePickerProps {
  value?: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
}

export default function ImagePicker({ value = [], onChange, maxFiles = 10, maxSize = 2 * 1024 * 1024 }: ImagePickerProps) {
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);

  useEffect(() => {
    const items = value.map(file => ({ file, url: URL.createObjectURL(file) }));
    setPreviews(items);
    return () => items.forEach(item => URL.revokeObjectURL(item.url));
  }, [value]);

  const onDrop = useCallback((accepted: File[]) => {
    onChange([...value, ...accepted].slice(0, maxFiles));
  }, [value, onChange, maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxSize,
    multiple: true,
  });

  const removeImage = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      <div {...getRootProps()} className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"}`}>
        <input {...getInputProps()} />
        <ImagePlus className="mb-3 h-8 w-8 text-gray-500" />
        <p className="text-sm font-medium">{isDragActive ? "Drop images here" : "Click or drag images here"}</p>
        <p className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP · Max {maxSize / 1024 / 1024}MB</p>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {previews.map((item, index) => (
            <div key={`${item.file.name}-${index}`} className="group relative aspect-square overflow-hidden rounded-lg border">
              <img src={item.url} alt={item.file.name} className="h-full w-full object-cover" />
              <button type="button" onClick={() => removeImage(index)} className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition group-hover:opacity-100">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500">{previews.length}/{maxFiles} images selected</p>
    </div>
  );
}