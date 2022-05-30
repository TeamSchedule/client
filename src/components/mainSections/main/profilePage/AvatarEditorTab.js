import React, {useState} from "react";

import AvatarEditor from "react-avatar-editor";
import {Slider} from "@mui/material";
import Typography from "@mui/material/Typography";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Dropzone from 'react-dropzone'
import Button from "@mui/material/Button";


export default function AvatarEditorTab() {

    const [avatarEditor, setAvatarEditor] = useState();

    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);

    const [croppedImg, setCroppedImg] = useState("");
    const [loadedImg, setLoadedImg] = useState("");

    const [enabledToSave, setEnabledToSave] = useState(false);

    const onClickSave = () => {
        // https://www.npmjs.com/package/react-native-fs#usage-android
        if (avatarEditor) {
            const canvas = avatarEditor.getImage().toDataURL();

            fetch(canvas)
                .then(res => res.blob())
                .then(blob => {
                    setCroppedImg(URL.createObjectURL(blob));
                });
        }
    }

    const onDeleteImage = () => {
        setRotate(0);
        setScale(1);
        setEnabledToSave(true);
        setCroppedImg("");
        setLoadedImg("");
    }


    return (
        <>
            <div className="d-flex px-0">
                <AvatarEditor
                    ref={editor => setAvatarEditor(editor)}
                    image={loadedImg}
                    width={250}
                    height={250}
                    border={50}
                    onImageReady={() => {
                        setEnabledToSave(true)
                    }}
                    borderRadius={125}  // width // 2
                    color={[25, 118, 210]}
                    scale={scale}
                    rotate={rotate}
                    onLoadFailure={() => {
                        alert("Upload error! Upload images");
                        setEnabledToSave(false);
                    }}
                />
                <Dropzone
                    onDrop={dropped => setLoadedImg(dropped[0])}
                    noKeyboard
                    style={{width: '250px', height: '250px'}}
                >
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()}
                             style={{borderColor: "#1976d2"}}
                             className="d-flex w-100 align-items-stretch border-3 px-0">
                            <div className="p-3 d-flex justify-content-center align-items-center flex-grow-1">
                                <Button className="p-2 px-3"
                                        startIcon={<AddPhotoAlternateIcon fontSize="large"
                                                                          sx={{width: 64, height: 64}} />}>
                                    Нажмите,&nbsp;чтобы&nbsp;загрузить<br />или<br />перетащите&nbsp;изображение
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
                        <Slider value={scale}
                                onChange={e => setScale(e.target.value)}
                                step={0.01}
                                min={1}
                                max={3}
                                valueLabelDisplay="auto"
                                aria-label="Slider" />
                    </div>
                    <div className="py-2">
                        <Typography>Вращение</Typography>
                        <Slider value={rotate}
                                onChange={e => setRotate(e.target.value)}
                                step={0.1}
                                min={-180}
                                max={180}
                                valueLabelDisplay="auto"
                                aria-label="Slider" />
                    </div>
                    <Button variant="outlined" fullWidth={true} onClick={() => {
                        setRotate(0);
                        setScale(1);
                    }}>Сбросить настройки</Button>
                </div>
                <div
                    className="p-2 d-flex flex-column-reverse col px-0 ml-2">
                    <Button variant="outlined" fullWidth={true} onClick={onClickSave} disabled={!enabledToSave}>
                        Показать превью
                    </Button>
                    <img src={croppedImg} alt="Предварительный&nbsp;просмотр" width="125" height="125" className="m-auto"
                         style={{borderRadius: "50%"}} />
                </div>
            </div>

            <Button variant="contained"
                    fullWidth={true}
                    onClick={onClickSave}
                    className="my-2" disabled={!enabledToSave}>СОХРАНИТЬ</Button>

            <Button variant="contained"
                    fullWidth={true}
                    onClick={onDeleteImage}
                    color="error"
                    className="mt-4">УДАЛИТЬ ИЗОБРАЖЕНИЕ</Button>
        </>
    );
}
