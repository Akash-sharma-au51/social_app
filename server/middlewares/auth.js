const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided", success: false });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        
        req.user = { user_id: decoded.user_id, email: decoded.email };

       
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token", success: false });
    }
};

module.exports = authMiddleware;
