import Grid from "@mui/material/Grid";
import React from "react";
import FileItem from "./../FileItem/FileItem";

interface FileListProps {
    files: File[];
    detachFile: (fileName: string) => void;
}

export default function FileList(props: FileListProps) {
    return (
        <Grid container spacing={1} sx={{ display: "flex", alignItems: "center" }}>
            {props.files.map((f: File) => (
                <FileItem key={f.name} file={f} detachFile={props.detachFile} />
            ))}
        </Grid>
    );
}
