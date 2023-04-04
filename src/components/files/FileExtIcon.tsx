import { SvgIcon } from "@mui/material";
import React, { useMemo } from "react";
import { getFileIconForFile } from "../../utils/fileUtils";

interface FileExtIconProps {
    fileExtension: string;
}

export default function FileExtIcon(props: FileExtIconProps) {
    const fileIcon = useMemo(() => getFileIconForFile(props.fileExtension), [props.fileExtension]);

    return (
        <>
            <SvgIcon component={fileIcon} sx={{ mr: 1 }} />
        </>
    );
}
