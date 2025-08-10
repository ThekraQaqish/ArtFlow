const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = function routeGuard(req, res, next) {


    const authHeader = req.headers["authorization"];
    const tokenFromHeader = authHeader && authHeader.split(' ')[1];
    const tokenFromQuery = req.query.token;
    const token = tokenFromHeader || tokenFromQuery;
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user =decoded;
        //console.log('User role:', req.user.role);
        next();
    }
    catch(err){
        return res.status(403).json({message:'Invalid or expired token'});
    }
}