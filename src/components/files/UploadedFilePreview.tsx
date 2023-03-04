import { FileResponseItemSchema } from "../../api/schemas/responses/files";
import Typography from "@mui/material/Typography";
import fileSize from "../../utils/fileSize";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import React, { useState } from "react";
import { makeFileLink } from "../../utils/fileUtils";
import { EventTypesStrings } from "../../enums/filesEnums";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { API } from "../../api/api";
import ErrorSnackbar from "../snackbars/ErrorSnackbar";
import SuccessSnackbar from "../snackbars/SuccessSnackbar";
import Divider from "@mui/material/Divider";

interface UploadedFilePreviewProps {
    file: FileResponseItemSchema;
    eventType: EventTypesStrings;
}

export default function UploadedFilePreview(props: UploadedFilePreviewProps) {
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const [isDeletingSuccess, setIsDeletingSuccess] = useState<boolean>(false);
    const [isDeletingError, setIsDeletingError] = useState<boolean>(false);

    function onClickDelete() {
        API.files
            .dropFileById(props.file.id)
            .then(() => {
                setIsDeleted(true);
                setIsDeletingSuccess(true);
            })
            .catch(() => {
                setIsDeletingError(true);
            })
            .finally();
    }

    const handleCloseSuccessDeleteSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsDeletingSuccess(false);
    };

    const handleCloseErrorDeleteSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsDeletingError(false);
    };

    return (
        <>
            {!isDeleted && (
                <>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1, wordWrap: "" }}>
                        {/*<SvgIcon component={fileIcon} sx={{ mr: 1 }} />*/}
                        <Typography variant="body1" component="span" sx={{ flexGrow: 1 }}>
                            {props.file.filename}
                        </Typography>

                        <Typography sx={{ mx: 3 }}>{fileSize(1234)}</Typography>

                        <Tooltip title="Скачать файл">
                            <IconButton sx={{ p: 0, m: 0 }}>
                                <a href={makeFileLink(props.file, props.file.event_id, props.eventType)}>
                                    <DownloadIcon />
                                </a>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Удалить файл">
                            <IconButton sx={{ p: 0, m: 0, ml: 3 }} color="error" onClick={onClickDelete}>
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Divider />
                </>
            )}
            <ErrorSnackbar handleClose={handleCloseErrorDeleteSnackbar} isOpen={isDeletingError}>
                Не удалось удалить файл {props.file.filename}!
            </ErrorSnackbar>
            <SuccessSnackbar handleClose={handleCloseSuccessDeleteSnackbar} isOpen={isDeletingSuccess}>
                Файл {props.file.filename} удален!
            </SuccessSnackbar>
        </>
    );
}