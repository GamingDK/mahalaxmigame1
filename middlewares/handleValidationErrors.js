const { validationResult } = require("express-validator")

const handleValidationErrors = (req , res,next) =>{
    const error = validationResult(req);
    if(!error.isEmpty()) return res.send({status:false, msg:"validation Error!!!",errors:error.array()})
           next() 
}

module.exports = handleValidationErrors