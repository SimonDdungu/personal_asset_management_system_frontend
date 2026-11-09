"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, X, FileSpreadsheet, Presentation } from "lucide-react";

interface DocumentPickerProps {
  value?: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
}

const formats = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/rtf": [".rtf"],
  "text/rtf": [".rtf"],
  "application/vnd.oasis.opendocument.text": [".odt"],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
  "application/vnd.oasis.opendocument.spreadsheet": [".ods"],
  "text/csv": [".csv"],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
  "application/vnd.oasis.opendocument.presentation": [".odp"],
};

export default function DocumentPicker({ value = [], onChange, maxFiles = 10, maxSize = 5 * 1024 * 1024 }: DocumentPickerProps) {
  const onDrop = useCallback((accepted: File[]) => {
    onChange([...value, ...accepted].slice(0, maxFiles));
  }, [value, onChange, maxFiles]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: formats,
    maxSize,
    multiple: true,
  });

  const removeDocument = (index: number) => onChange(value.filter((_, i) => i !== index));

  const getIcon = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (["xls", "xlsx", "ods", "csv"].includes(ext || "")) return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
    if (["ppt", "pptx", "odp"].includes(ext || "")) return <Presentation className="h-5 w-5 text-orange-600" />;
    return <FileText className="h-5 w-5 text-blue-600" />;
  };

  return (
    <div className="space-y-4">
      <div {...getRootProps()} className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"}`}>
        <input {...getInputProps()} />
        <FileText className="mb-3 h-8 w-8 text-gray-500" />
        <p className="text-sm font-medium">{isDragActive ? "Drop documents here" : "Click or drag documents here"}</p>
        <p className="mt-1 text-center text-xs text-gray-500">PDF, DOC, DOCX, RTF, ODT, XLS, XLSX, ODS, CSV, PPT, PPTX, ODP</p>
        <p className="text-xs text-gray-500">Max {maxSize / 1024 / 1024}MB per file</p>
      </div>

      {fileRejections.length > 0 && <p className="text-sm text-red-500">Some files were rejected. Check their format and size.</p>}

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex min-w-0 items-center gap-3">
                {getIcon(file)}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button type="button" onClick={() => removeDocument(index)} className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-red-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500">{value.length}/{maxFiles} documents selected</p>
    </div>
  );
}