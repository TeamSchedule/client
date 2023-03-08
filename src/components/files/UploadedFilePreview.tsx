import { FileResponseItemSchema } from "../../api/schemas/responses/files";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import React, { useState } from "react";
import { fileSize, makeFileLink } from "../../utils/fileUtils";
import { EventTypesStrings } from "../../enums/filesEnums";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { API } from "../../api/api";
import ErrorSnackbar from "../snackbars/ErrorSnackbar";
import SuccessSnackbar from "../snackbars/SuccessSnackbar";
import Divider from "@mui/material/Divider";
import WarningDialog from "../WarningDialog/WarningDialog";

interface UploadedFilePreviewProps {
    file: FileResponseItemSchema;
    eventType: EventTypesStrings;
}

export default function UploadedFilePreview(props: UploadedFilePreviewProps) {
    // состояние видимости окна подтверждения удаления
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false);

    // результаты api запросов
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [isDeletingSuccess, setIsDeletingSuccess] = useState<boolean>(false);
    const [isDeletingError, setIsDeletingError] = useState<boolean>(false);

    function onClickDelete() {
        setOpenDeleteConfirm(true);
    }

    function dropFile() {
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
                        <Typography
                            variant="body1"
                            component="span"
                            sx={{
                                flexGrow: 1,
                                overflow: "auto",
                                fontSize: "0.9rem",
                                "&::-webkit-scrollbar": {
                                    display: "none",
                                },
                                msOverflowStyle: "none" /* IE and Edge */,
                                scrollbarWidth: "none" /* Firefox */,
                            }}
                        >
                            {props.file.filename}
                        </Typography>

                        <Typography
                            sx={{
                                mx: 1,
                                fontSize: "0.9rem",
                                verticalAlign: "baseline",
                                color: "#7a7a7a",
                            }}
                        >
                            {fileSize(props.file.size)}
                        </Typography>

                        <Tooltip title="Скачать файл">
                            <IconButton sx={{ p: 0, m: 0 }}>
                                <a href={makeFileLink(props.file, props.file.owner_id, props.eventType)}>
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
            <WarningDialog
                open={openDeleteConfirm}
                setOpen={setOpenDeleteConfirm}
                title="Удалить файл?"
                text={`Вы уверены, что хотите удалить "${props.file.filename}"?`}
                handleAgree={dropFile}
            />

            <ErrorSnackbar handleClose={handleCloseErrorDeleteSnackbar} isOpen={isDeletingError}>
                Не удалось удалить файл {props.file.filename}!
            </ErrorSnackbar>
            <SuccessSnackbar handleClose={handleCloseSuccessDeleteSnackbar} isOpen={isDeletingSuccess}>
                Файл {props.file.filename} удален!
            </SuccessSnackbar>
        </>
    );
}
