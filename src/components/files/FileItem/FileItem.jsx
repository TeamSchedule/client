import React from 'react'
import { SvgIcon } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import TableViewIcon from '@mui/icons-material/TableView';
import ImageIcon from '@mui/icons-material/Image';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadingIcon from '@mui/icons-material/Downloading';
import './FileItem.scss'

const fileIcons = {
    pdf: PictureAsPdfIcon,
    doc: DescriptionIcon,
    docx: DescriptionIcon,
    ppt: CoPresentIcon,
    xls: TableViewIcon,
    xlsx: TableViewIcon,
    png: ImageIcon,
    jpg: ImageIcon,
    jpeg: ImageIcon,
    bmp: ImageIcon,
    zip: FolderZipIcon,
    "7z": FolderZipIcon,
    tar: FolderZipIcon,
    csv: TextSnippetIcon,
    default: InsertDriveFileIcon,
};

const FileItem = ({ file, deleteFile }) => {
    if (!Array.prototype.last) {
        Array.prototype.last = function () {
            return this[this.length - 1];
        };
    }
    console.log(file);

    const fileIcon = fileIcons[file.name.split(".").last()] || fileIcons.default;

    function convertBytes(bytes) {
        const kilobytes = bytes / 1024;
        const megabytes = bytes / (1024 * 1024);

        return {
            kilobytes: Math.round(kilobytes),
            megabytes: Math.round(megabytes),
        };
    }

    const fileSizeInBytes = convertBytes(file.size);

    return (
        <li className="file-item" key={file.name}>
            <SvgIcon component={fileIcon} />
            <p>{file.name}</p>
            <p>{fileSizeInBytes.kilobytes} КБ</p>
            <div className="actions">
                {/* <div className="loading"></div> */}
                {/* {file.isUploading && (
                    <FontAwesomeIcon
                        icon={faSpinner}
                        className="fa-spin"
                    > 
                )} */}
                <SvgIcon component={DeleteIcon} onClick={() => deleteFile(file.name)} />
                {!file.isUploading && (
                    <SvgIcon component={DownloadingIcon} />
                )}
            </div>
        </li>
    );
};


export default FileItem
