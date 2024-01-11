const router = require('express').Router();
const File = require('../models/validate.js');

router.get('/:uuid',async (req,res)=>{
    const file = await File.findOne({uuid:req.params.uuid});
    if(!file) {
        return res.status(404).json({msg:"File Not Found! or Link Has Been Expired!"});
    }

    const filePath = `${__dirname}/../${file.path}`;
    res.download(filePath);
});

module.exports = router;