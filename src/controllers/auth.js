import jwt from 'jsonwebtoken'
import User from '../models/user'
import 'dotenv/config'


const createToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

class AuthController {

    static async signup (req, res) {
        const {username, name, lastname, password, role, age} = req.body;
        try {
            const newUser = await User.create({
                username,
                password,
                name,
                lastname,
                age,
                role
            });
            const token = createToken(newUser._id);
            newUser.password = undefined
            res.status(201).json({
                status: 'success',
                data: {
                    user: newUser,
                    token
                }
            });
        }catch(err) {
            return res.status(500).json(error);
        }
       
    };
    
    static async  login (req, res) {
        const { username, password } = req.body;
        try {
            if(!username || !password) {
                return res.status(400).json({ error: 'Email or Password not provided' });
            }
            const user = await User.findOne({ username }).select('+password');
        
            if (!user || !(await user.checkPassword(password, user.password))) {
                return res.status(401).json({ error: 'Invalid Email or Password'})
            }
            const token = createToken(user._id);
            res.status(200).json({
                status: 'success',
                data: {
                    token
                }
            });
        } catch(err) {
            return res.status(500).json(error);
        }
        
    };

    static async logout (req, res) {
    // remove the req.user property and clear the login session
        req.logout;
    
        // destroy session data
        req.session = null;
    
        // redirect to homepage
        res.redirect('/');
    }
    
}

export default AuthController;