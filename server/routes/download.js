const router = require('express').Router();
const File = require('../models/validate.js');
// const https = require('https');

router.get('/:uuid',async (req,res)=>{
    const uuid = req.params.uuid;
    const file = await File.findOne({uuid});
    if(!file) {
        return res.status(404).json({msg:"File Not Found! or Link Has Been Expired!"});
    }
    const filePath = `${__dirname}/../uploads/${file.filename}`;
    res.download(filePath);

});

module.exports = router;