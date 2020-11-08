import jwt from 'jsonwebtoken'
import User from '../models/user'
import 'dotenv/config'

class Authenticator {

    static async verifyToken (req, res, next) {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        try {
            if (!token || token.trim() === '') {
                return res.status(401).json({
                    status: 'Failed',
                    error: 'Access Unauthorized'
                })
            }
        
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if(!user) {
                return res.status(404).json({
                    status: 'Failed',
                    error: 'User does not exist'
                })
            }
            req.user = user;
            next();
        }catch (error) {
            return res.status(500).json(error);
        }
        
    }
}

module.exports =  Authenticator;