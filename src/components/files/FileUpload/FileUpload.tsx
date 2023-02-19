import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface FileUploadProps {
    files: File[];
    setFiles: (files: Array<any>) => void;
}

export default function FileUpload(props: FileUploadProps) {
    const uploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = event.target.files;
        if (!newFiles) return;
        props.setFiles([...props.files, ...Array.from(newFiles)]);
    };

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Button fullWidth variant="contained" component="label" startIcon={<AddCircleIcon />}>
                    Загрузить файлы
                    <input hidden multiple type="file" onInput={uploadHandler} />
                </Button>
            </Box>
        </>
    );
}
