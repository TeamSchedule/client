import React from "react";
import { FileResponseItemSchema } from "../../api/schemas/responses/files";
import UploadedFilePreview from "./UploadedFilePreview";
import { EventTypesStrings } from "../../enums/filesEnums";
import { compareFile } from "../../utils/fileUtils";
import Typography from "@mui/material/Typography";

const defaultSectionHeader: string = "Файлы";

interface FileListProps {
    files: FileResponseItemSchema[];
    eventType: EventTypesStrings;
    isEditModeOn?: boolean;
    sectionHeader?: string;
}

export default function UploadFileList(props: FileListProps) {
    return (
        <>
            {props.files.length > 0 && (
                <>
                    <Typography variant="subtitle1" component="h2" sx={{ fontWeight: "bold", mt: 2, p: 0 }}>
                        {props.sectionHeader || defaultSectionHeader}
                    </Typography>

                    {props.files.sort(compareFile).map((f: FileResponseItemSchema) => (
                        <UploadedFilePreview
                            key={f.id}
                            file={f}
                            eventType={props.eventType}
                            isEditModeOn={props.isEditModeOn}
                        />
                    ))}
                </>
            )}
        </>
    );
}
