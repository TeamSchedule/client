import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faFilePdf, faFileWord, faFilePowerpoint, faSpinner, faFileExcel, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons'
import './FileItem.scss'

const fileIcons = {
    pdf: faFilePdf,
    doc: faFileWord,
    ppt: faFilePowerpoint,
    xls: faFileExcel,
    default: faFileAlt
};

const FileItem = ({ file, deleteFile }) => {
    const fileIcon = fileIcons[file.format] || fileIcons.default;

    return (
        <li className="file-item" key={file.name}>
            <FontAwesomeIcon icon={fileIcon} />
            <p>{file.name}</p>
            <div className="actions">
                <div className="loading"></div>
                {file.isUploading && (
                    <FontAwesomeIcon
                        icon={faSpinner}
                        className="fa-spin"
                        onClick={() => deleteFile(file.name)}
                    />
                )}
                {!file.isUploading && (
                    <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => deleteFile(file.name)}
                    />
                )}
                {!file.isUploading && (
                    <FontAwesomeIcon
                        icon={faDownload}
                    />
                )}
            </div>
        </li>
    );
};


export default FileItem
