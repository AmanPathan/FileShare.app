const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/validate.js');
const { v4: uuid4 } = require('uuid');

const APP_BASE_URL = process.env.APP_BASE_URL;
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;

//multer configuration
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${currentDate}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({
    storage: storage,
    limit: { fileSize: 100 * 1024 * 1024 }
});


router.post('/', upload.single('file'), async (req, res) => {


    // Store  in Uploads Folder

    // Validate Request

    if (!req.file) {
        return res.status(201).json({ error: "Upload a File First!" })
    }

    // if (err) {
    //     return res.status(404).json({ error: err.message });
    // }

    // Store into Database

    const file = new File({
        filename: req.file.filename,
        uuid: uuid4(),
        path: req.file.path,
        size: req.file.size
    });

    const response = await file.save();
    return res.json({ file: `${APP_BASE_URL}/files/${response.uuid}` });
    // Response -> Link 
});

module.exports = router;