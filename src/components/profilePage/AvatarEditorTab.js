import React, { useState } from "react";

import AvatarEditor from "react-avatar-editor";
import { Slider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Dropzone from "react-dropzone";
import Button from "@mui/material/Button";
import { API } from "../../api/api";
import RemovalFormButton from "../buttons/RemovalFormButton";
import SuccessFormButton from "../buttons/SuccessFormButton";
import CommonActionFormButton from "../buttons/CommonActionFormButton";
import GoBackActionButton from "../buttons/GoBackActionButton";
import { UserAvatar } from "../avatars";
import { AlternateAvatarImageIcon } from "../svg";
import { COLORS } from "../../consts";

export default function AvatarEditorTab() {
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

    const onClickSave = () => {
        const blobPromise = fetchBlobFromEditor();
        if (blobPromise) {
            blobPromise.then((blob) => {
                const myFile = new File([blob], "image1.jpeg", {
                    type: blob.type,
                });
                API.avatars.set(myFile).then(() => {
                    window.location.reload();
                });
            });
        }
    };

    const onClickDelete = () => {
        API.avatars.delete().then(() => {
            window.location.reload();
        });
    };

    return (
        <div className="px-7">
            <div className="d-flex px-0">
                <AvatarEditor
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
                    onDrop={(dropped) => setLoadedImg(dropped[0])}
                    noKeyboard
                    style={{ width: "250px", height: "250px" }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            {...getRootProps()}
                            style={{ borderColor: COLORS.PRIMARY }}
                            className="d-flex w-100 align-items-stretch border-3 px-0"
                        >
                            <div className="p-3 d-flex justify-content-center align-items-center flex-grow-1">
                                <Button
                                    className="p-2 px-3"
                                    startIcon={
                                        <AlternateAvatarImageIcon
                                            color={COLORS.PRIMARY}
                                            size={64}
                                        />
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
                            onChange={(e) => setScale(e.target.value)}
                            step={0.01}
                            min={1}
                            max={3}
                            valueLabelDisplay="auto"
                            aria-label="Slider"
                            style={{ color: COLORS.PRIMARY }}
                        />
                    </div>
                    <div className="py-2">
                        <Typography>Вращение</Typography>
                        <Slider
                            value={rotate}
                            onChange={(e) => setRotate(e.target.value)}
                            step={0.1}
                            min={-180}
                            max={180}
                            valueLabelDisplay="auto"
                            aria-label="Slider"
                            style={{ color: COLORS.PRIMARY }}
                        />
                    </div>
                    <CommonActionFormButton
                        btnText="СБРОСИТЬ НАСТРОЙКИ"
                        onClick={resetEditorParams}
                    />
                </div>
                <div className="p-2 d-flex flex-column-reverse col px-0 ml-2">
                    <CommonActionFormButton
                        btnText="ПОКАЗАТЬ ПРЕВЬЮ"
                        onClick={onClickPreview}
                        disabled={!enabledToSave}
                    />

                    {croppedImg && (
                        <UserAvatar
                            alt="Предварительный&nbsp;просмотр"
                            avatarSrc={croppedImg}
                            width={125}
                            height={125}
                            className="m-auto"
                        />
                    )}
                </div>
            </div>

            <SuccessFormButton
                btnText="СОХРАНИТЬ НОВЫЙ АВАТАР"
                onClick={onClickSave}
                disabled={!enabledToSave}
                className="mt-4"
            />

            <GoBackActionButton className="mt-5" />
            <RemovalFormButton
                btnText="УДАЛИТЬ СУЩЕСТВУЮЩИЙ АВАТАР"
                onClick={onClickDelete}
                className="mt-4"
            />
        </div>
    );
}
