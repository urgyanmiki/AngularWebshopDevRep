const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    try{
    const token = req.headers.authorization.split("")[1];
    jwt.verify(token,"nodem_lokja_trialt-secret_nopass_secretary_encryption98-2.urta_fgdjhhukk_tta");
    next();
    }catch(error){
        res.status(401).json({message: "Auth failed!"});
    }
}