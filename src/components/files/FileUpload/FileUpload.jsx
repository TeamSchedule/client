import React from 'react'
import { SvgIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './FileUpload.scss'
import axios from 'axios'

const FileUpload = ({ files, setFiles, removeFile }) => {
    const uploadHandler = (event) => {
        const newFiles = event.target.files;
        if (!newFiles) return;
        newFiles.isUploading = true;
        setFiles([...files, ...newFiles])

        // upload file
        /*const formData = new FormData();
        formData.append(
            "newFile",
            newFiles,
            newFiles.name
        )
        axios.post('http://localhost:8080/upload', formData)
            .then((res) => {
                file.isUploading = false;
                setFiles([...files, file])
            })
            .catch((err) => {
                // inform the user
                console.error(err)
                removeFile(file.name)
            });*/
    }

    return (
        <>
            <div className="file-card">
                <div className="file-inputs">
                    <input type="file" onChange={uploadHandler} multiple="multiple" />
                    <button>
                        <i>
                            <SvgIcon component={AddIcon}></SvgIcon>
                        </i>
                        Загрузить файлы
                    </button>
                </div>
                <p className="main">Поддерживемые файлы</p>
                <p className="info">PDF, DOC, JPG и др.</p>
            </div>
        </>
    )
}

export default FileUpload
