const router = require('express').Router();
const File = require('../models/validate.js');
const APP_BASE_URL = process.env.APP_BASE_URL;

router.get('/:uuid',async (req,res)=>{
    try{
        const uuid= req.params.uuid;
        // console.log(uuid);
        const file = await File.findOne({uuid});
        if(!file){
            return res.status(404).json({error:"File Doesn't Exist! or Link Has Been Expired"});
        }
        return res.json({
            uuid:file.uuid,
            fileName:file.filename,
            fileSize:file.size,
            downloadLink:`http://localhost:8000/files/download/${file.uuid}`
        })
    }catch(err){
        return res.status(404).json({error:"Something Went Wrong!!"});
    }

});

module.exports = router;