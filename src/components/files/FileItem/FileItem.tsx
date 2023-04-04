import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { fileSize } from "../../../utils/fileUtils";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import FileExtIcon from "../FileExtIcon";

function getLastItem(arr: Array<any>): any {
    return arr[arr.length - 1];
}

interface FileItemProps {
    file: File;
    detachFile: (fileName: string) => void;
}

const FileItem = (props: FileItemProps) => {
    return (
        <Grid container spacing={1} sx={{ display: "flex", alignItems: "center", mt: 1, wordWrap: "" }}>
            <Grid item xs={9}>
                <FileExtIcon fileExtension={getLastItem(props.file.name.split("."))} />
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
