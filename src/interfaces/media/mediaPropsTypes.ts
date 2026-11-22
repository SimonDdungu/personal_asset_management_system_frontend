export interface mediaProps {
    assetName?: string;
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    setFileCaption?: (value: string) => void;
    setFileType?: (value: string) => void;
}