const jwt = require('jsonwebtoken');
const express = require('express')
const app = express()

const SECRET_KEY = `${process.env.JWT_SECRET}`;

// export interfa CustomRequest extends Request {
//  token: string | JwtPayload;
// }

module.exports = {
isAuthorized: async (req, res, next) => {
 try {
   const access_token = req.header('Authorization')?.replace('Bearer ', '');
   console.log(access_token)
   if (!access_token) return res.status(401).json({message: "User is not Authenticated"});
   const decoded = jwt.verify(access_token, SECRET_KEY);
   next();
 } catch (err) {
   res.status(401).json({message:'Unable To Complete Authentication', err});
 }
}
}
