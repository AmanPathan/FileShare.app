const router = require('express').Router();
const File = require('../models/validate.js');
const https = require('https');

router.get('/:uuid',async (req,res)=>{
    const file = await File.findOne({uuid:req.params.uuid});
    if(!file) {
        return res.status(404).json({msg:"File Not Found! or Link Has Been Expired!"});
    }
    https.get(file.path,(fileStream)=>{
        fileStream.pipe(res)
    })

});

module.exports = router;