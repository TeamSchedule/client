const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');

app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single('file'), (req, res) => {
    const file = req.file;
    const ext = path.extname(file.originalname).toLowerCase();
    let format;

    switch (ext) {
        case '.pdf':
            format = 'pdf';
            break;
        case '.doc':
        case '.docx':
            format = 'doc';
            break;
        case '.ppt':
        case '.pptx':
            format = 'ppt';
            break;
        case '.xls':
        case '.xlsx':
            format = 'xls';
            break;
        default:
            format = 'default';
    }

    file.format = format;

    // Save the file object (including the format property) to your database, or return it to the front-end as part of the response, etc.

    setTimeout(() => {
        console.log('file uploaded')
        return res.status(200).json({ result: true, msg: 'file uploaded', file });
    }, 3000);
});

app.delete("/upload", (req, res) => {
    console.log(`File deleted`)
    return res.status(200).json({ result: true, msg: 'file deleted' });
});

app.listen(8080, () => {
    console.log(`Server running on port 8080`)
});
