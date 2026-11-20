import { PdfIcon, DocIcon, DocxIcon, XlsIcon, XlsxIcon, PptIcon, PptxIcon, TxtIcon } from "@nice2dev/icons-filetypes";
import { File } from "lucide-react";

export const getDocumentIcon = (fileName: string) => {
    const extension = fileName?.split(".").pop()?.toLowerCase();

    const icons: Record<string, React.ElementType> = {
        pdf: PdfIcon,
        doc: DocIcon,
        docx: DocxIcon,
        xls: XlsIcon,
        xlsx: XlsxIcon,
        ppt: PptIcon,
        pptx: PptxIcon,
        txt: TxtIcon,
    };

    const Icon = icons[extension ?? ""];

    return Icon
        ? <Icon size={45} variant="colored" />
        : <File size={45} className="text-gray-500" />;
};