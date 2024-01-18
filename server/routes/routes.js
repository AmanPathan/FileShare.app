const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/validate.js');
const { v4: uuid4 } = require('uuid');
const { v2: cloudinary } = require('cloudinary');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();

router.post("/", async (req, res) => {
    try {
        const {fileName,fileUUID,fileHash,fileLink,fileSize} = req.body;
        if (!fileLink) {
            return res.status(201).json({ error: "Upload a File First!" });
        }
        const file_data = new File({
            filename:fileName,
            path:fileLink,
            uuid:fileUUID,
            filehash:fileHash,
            fileSize:fileSize,
        });
        const response = await file_data.save();
        return res.json({data:file_data});
    } catch (err) {
        return res.json({ error: err.message });
    }
})

// router.post('/', upload.single('file'), async (req, res) => {


//     // Store  in Uploads Folder

//     // Validate Request

//     if (!req.file) {
//         return res.status(201).json({ error: "Upload a File First!" })
//     }

//     // if (err) {
//     //     return res.status(404).json({ error: err.message });
//     // }

//     // Store into Database

//     const file = new File({
//         filename: req.file.filename,
//         uuid: uuid4(),
//         path: req.file.path,
//         size: req.file.size
//     });

//     const response = await file.save();
//     // console.log(response);
//     // return res.json({ file: `http://localhost:3000/files/${response.uuid}` });
//     return res.json({data:response});
//     // Response -> Link 
// });




module.exports = router;