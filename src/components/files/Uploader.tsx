import React, { useState } from "react";
import FileList from "./FileList/FileList";
import LoadingButton from "@mui/lab/LoadingButton";
import { API } from "../../api/api";
import { EventTypesStrings } from "../../enums/filesEnums";
import SuccessSnackbar from "../snackbars/SuccessSnackbar";
import FormInputItemWrapper from "../common/FormInputItemWrapper";
import FileUpload from "./FileUpload/FileUpload";

interface UploaderProps {
    destId: number;
    destType: EventTypesStrings;
    successHandler?: () => void;
}

export default function Uploader(props: UploaderProps) {
    const [attachments, setAttachments] = useState<File[]>([]);

    // статус загрузки
    const [inProgressFiles, setInProgressFiles] = useState<boolean>(false);
    const [isNewFilesFinished, setIsNewFilesFinished] = useState<boolean>(false);

    function onLoadFiles(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (props.destId === undefined) return;
        setInProgressFiles(true);

        const saveFilePromises = attachments.map((attachment) =>
            API.files
                .addFile(props.destId, props.destType, attachment)
                .then(() => {})
                .catch(() => {})
                .finally(() => {})
        );

        Promise.all(saveFilePromises)
            .then(() => {
                setIsNewFilesFinished(true);
                if (props.successHandler) props.successHandler();
            })
            .catch(() => {})
            .finally(() => {
                setInProgressFiles(false);
            });
    }

    const handleCloseNewFilesSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsNewFilesFinished(false);
    };

    return (
        <>
            <FormInputItemWrapper className="d-flex align-items-center mt-4">
                <FileUpload files={attachments} setFiles={setAttachments} />
            </FormInputItemWrapper>

            <FileList
                files={attachments}
                detachFile={(excludeFilename: string) =>
                    setAttachments([...attachments.filter((attachment) => attachment.name !== excludeFilename)])
                }
            />

            {attachments.length > 0 && (
                <LoadingButton
                    fullWidth
                    onClick={onLoadFiles}
                    loading={inProgressFiles}
                    variant="contained"
                    sx={{ my: 2 }}
                >
                    Прикрепить файлы
                </LoadingButton>
            )}

            <SuccessSnackbar handleClose={handleCloseNewFilesSnackbar} isOpen={isNewFilesFinished}>
                Файлы загружены!
            </SuccessSnackbar>
        </>
    );
}
