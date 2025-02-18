const jwt = require('jsonwebtoken');

const isuserauthenticated = async(req,res,next)=>{
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message:"authentication required",
            success:false,

        })
        
    } else {
        jwt.verify(token,process.env.JWT_TOKEN,(err,decoded)=>{
            if (err) {
                return res.status(401).json({
                    message:"Unauthorized invalid token",
                    success:false
                })
                
            } else {
                req.user = decoded
                next()
                
            }
        })
        
    }
}

module.exports = isuserauthenticated;