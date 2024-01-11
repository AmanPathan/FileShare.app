const router = require('express').Router();
const File = require('../models/validate.js');
const APP_BASE_URL = process.env.APP_BASE_URL;

router.get('/:id',async (req,res)=>{
    try{
        const id= req.params.id;
        const file = await File.findOne({_id:id});
        if(!file){
            return res.status(404).json({error:"File Doesn't Exist! or Link Has Been Expired"});
        }
        return res.json({
            id:file._id,
            fileName:file.filename,
            fileSize:file.size,
            fileFormat:file.format,
            downloadLink:file.path
        })
    }catch(err){
        return res.status(404).json({error:"Something Went Wrong!!"});
    }

});

module.exports = router;