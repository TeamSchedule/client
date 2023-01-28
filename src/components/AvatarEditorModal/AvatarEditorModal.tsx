import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// @ts-ignore
import AvatarEditor from "react-avatar-editor";
import { Slider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Dropzone from "react-dropzone";
import Button from "@mui/material/Button";
import { API } from "../../api/api";
import { MainAvatar } from "../MainAvatar";
import { AlternateAvatarImageIcon } from "../svg";
import { BaseButton } from "../buttons";
import BaseModal from "../modals/BaseModal";
import styles from "./AvatarEditorModal.module.scss";

interface AvatarEditorTab {
    avatarType?: string;
}

export default function AvatarEditorModal(props: AvatarEditorTab) {
    const navigate = useNavigate();
    const { teamId } = useParams();

    const onClickSave = (blobPromise: Promise<Blob> | null) => {
        if (blobPromise) {
            blobPromise.then((blob: Blob) => {
                const myFile = new File([blob], "image1.jpeg", {
                    type: blob.type,
                });
                API.avatars
                    .set(myFile)
                    .then(() => {
                        navigate("/");
                        window.location.reload();
                    })
                    .catch(() => {
                        alert("Could not save image! Try later");
                    });
            });
        }
    };

    const onClickDelete = () => {
        API.avatars.delete().then(() => {
            navigate("/");
            window.location.reload();
        });
    };

    const onClickSaveTeam = (blobPromise: Promise<Blob> | null) => {
        if (teamId === undefined) {
            alert("Ошибка распознования команды");
            return;
        }

        if (blobPromise) {
            blobPromise.then((blob: Blob) => {
                const myFile = new File([blob], "image1.jpeg", {
                    type: blob.type,
                });
                API.units.setAvatar(teamId, myFile).then(() => {
                    navigate("..");
                    window.location.reload();
                });
            });
        }
    };

    const onClickDeleteTeam = () => {
        if (teamId === undefined) {
            alert("Ошибка распознования команды");
            return;
        }
        API.units.deleteAvatar(teamId).then(() => {
            navigate("..");
            window.location.reload();
        });
    };

    if (props.avatarType === "personal") {
        return (
            <>
                <AvatarEditorSection deleteHandler={onClickDelete} saveHandler={onClickSave} />
            </>
        );
    } else if (props.avatarType === "team") {
        return (
            <>
                <AvatarEditorSection deleteHandler={onClickDeleteTeam} saveHandler={onClickSaveTeam} />
            </>
        );
    }
    return null;
}

interface AvatarEditorSectionProps {
    saveHandler: (fetchBlobFromEditor: Promise<Blob> | null) => void;
    deleteHandler: () => void;
}

function AvatarEditorSection(props: AvatarEditorSectionProps) {
    const navigate = useNavigate();

    const [avatarEditor, setAvatarEditor] = useState();

    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);

    const [croppedImg, setCroppedImg] = useState("");
    const [loadedImg, setLoadedImg] = useState("");

    const [enabledToSave, setEnabledToSave] = useState(false);

    function resetEditorParams() {
        setRotate(0);
        setScale(1);
    }

    function fetchBlobFromEditor() {
        // https://www.npmjs.com/package/react-native-fs#usage-android
        if (avatarEditor) {
            // @ts-ignore
            const canvas = avatarEditor.getImageScaledToCanvas().toDataURL();
            return fetch(canvas).then((res) => res.blob());
        }
        return null;
    }

    const onClickPreview = () => {
        const blobPromise = fetchBlobFromEditor();
        if (blobPromise) {
            blobPromise.then((blob) => {
                const obUrl = URL.createObjectURL(blob);
                setCroppedImg(obUrl);
            });
        }
    };

    return (
        <BaseModal title="Смена аватара" onCloseClickHandler={() => navigate("..")}>
            <div>
                <div className="d-flex px-0">
                    <AvatarEditor
                        // @ts-ignore
                        ref={(editor) => setAvatarEditor(editor)}
                        image={loadedImg}
                        width={250}
                        height={250}
                        border={50}
                        onImageReady={() => {
                            setEnabledToSave(true);
                        }}
                        borderRadius={125} // width // 2
                        color={[94, 140, 190]}
                        scale={scale}
                        rotate={rotate}
                        onLoadFailure={() => {
                            alert("Upload error! Upload images");
                            setEnabledToSave(false);
                        }}
                    />
                    <Dropzone
                        // @ts-ignore
                        onDrop={(dropped) => setLoadedImg(dropped[0])}
                        noKeyboard
                        // @ts-ignore
                        style={{ width: "250px", height: "250px" }}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className={styles.avatarEditorWrapAria}>
                                <div className="p-3 d-flex justify-content-center align-items-center flex-grow-1">
                                    <Button
                                        className="p-2 px-3"
                                        startIcon={
                                            <AlternateAvatarImageIcon className={styles.avatarEditorElem} size={64} />
                                        }
                                    >
                                        Нажмите,&nbsp;чтобы&nbsp;загрузить
                                        <br />
                                        или
                                        <br />
                                        перетащите&nbsp;изображение
                                    </Button>
                                    <input {...getInputProps()} className="w-100" />
                                </div>
                            </div>
                        )}
                    </Dropzone>
                </div>
                <div className="d-flex px-0">
                    <div className="col px-0 mr-2">
                        <div className="py-2">
                            <Typography>Масштаб</Typography>
                            <Slider
                                value={scale}
                                // @ts-ignore
                                onChange={(e) => setScale(e.target.value)}
                                step={0.01}
                                min={1}
                                max={3}
                                valueLabelDisplay="auto"
                                aria-label="Slider"
                                className={styles.avatarEditorElem}
                            />
                        </div>
                        <div className="py-2">
                            <Typography>Вращение</Typography>
                            <Slider
                                value={rotate}
                                // @ts-ignore
                                onChange={(e) => setRotate(e.target.value)}
                                step={0.1}
                                min={-180}
                                max={180}
                                valueLabelDisplay="auto"
                                aria-label="Slider"
                                className={styles.avatarEditorElem}
                            />
                        </div>
                        <BaseButton
                            text="Сбросить настройки"
                            color="common"
                            onClick={resetEditorParams}
                            className="w-100"
                        />
                    </div>
                    <div className="p-2 d-flex flex-column-reverse col px-0 ml-2">
                        <BaseButton
                            text="Показать превью"
                            color="common"
                            className="w-100"
                            onClick={onClickPreview}
                            disabled={!enabledToSave}
                        />
                        {croppedImg && <MainAvatar src={croppedImg} size={125} />}
                    </div>
                </div>
                <BaseButton
                    text="Сохранить новый аватар"
                    color="success"
                    onClick={(event) => {
                        event.preventDefault();
                        props.saveHandler(fetchBlobFromEditor());
                    }}
                    className="mt-4 w-100"
                    disabled={!enabledToSave}
                />
                <BaseButton text="Удалить аватар" color="danger" className="mt-4 w-100" onClick={props.deleteHandler} />
            </div>
        </BaseModal>
    );
}
