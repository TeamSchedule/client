import { MEDIA_STATIC_SERVER } from "../api/config";
import { FileResponseItemSchema } from "../api/schemas/responses/files";
import { EventTypesStrings } from "../enums/filesEnums";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import TableViewIcon from "@mui/icons-material/TableView";
import ImageIcon from "@mui/icons-material/Image";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SvgIcon from "@mui/material/SvgIcon";

export function makeFileLink(file: FileResponseItemSchema, parentId: number, parentType: EventTypesStrings): string {
    return [MEDIA_STATIC_SERVER, parentType, parentId, file.filename].join("/");
}

export function fileSize(bytes: number): string {
    const kilobytes: number = bytes / 1024;
    const megabytes: number = kilobytes / 1024;

    if (megabytes > 1) {
        return Math.floor(megabytes * 10) / 10 + "MB";
    }
    return Math.floor(kilobytes * 10) / 10 + "KB";
}

export function makeAvatarPath(owner_id: number, filename: string): string {
    return [MEDIA_STATIC_SERVER, "USER", owner_id, filename].join("/");
}

const fileIcons: object = {
    pdf: PictureAsPdfIcon,
    doc: DescriptionIcon,
    docx: DescriptionIcon,
    ppt: CoPresentIcon,
    xls: TableViewIcon,
    xlsx: TableViewIcon,
    png: ImageIcon,
    jpg: ImageIcon,
    jpeg: ImageIcon,
    bmp: ImageIcon,
    zip: FolderZipIcon,
    "7z": FolderZipIcon,
    tar: FolderZipIcon,
    csv: TextSnippetIcon,
    default: InsertDriveFileIcon,
};

export function getFileIconForFile(fileExtension: string): typeof SvgIcon {
    // @ts-ignore
    return fileIcons[fileExtension] || fileIcons["default"];
}

export function compareFile(a: FileResponseItemSchema, b: FileResponseItemSchema): number {
    return b.id - a.id;
}
