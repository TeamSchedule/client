import React from "react";
import { SvgIcon } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import TableViewIcon from "@mui/icons-material/TableView";
import ImageIcon from "@mui/icons-material/Image";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { fileSize } from "../../../utils/fileUtils";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

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

function getLastItem(arr: Array<any>): any {
    return arr[arr.length - 1];
}

interface FileItemProps {
    file: File;
    detachFile: (fileName: string) => void;
}

const FileItem = (props: FileItemProps) => {
    // @ts-ignore
    const fileIcon = fileIcons[getLastItem(props.file.name.split("."))] || fileIcons["default"];

    return (
        <Grid container spacing={1} sx={{ display: "flex", alignItems: "center", mt: 1, wordWrap: "" }}>
            <Grid item xs={9}>
                <SvgIcon component={fileIcon} sx={{ mr: 1 }} />
                <Typography variant="body1" component="span">
                    {props.file.name}
                </Typography>
            </Grid>

            <Grid item xs={2}>
                <Typography>{fileSize(props.file.size)}</Typography>
            </Grid>

            <Grid item xs={1}>
                <IconButton onClick={() => props.detachFile(props.file.name)} sx={{ p: 0, m: 0 }}>
                    <ClearIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default FileItem;