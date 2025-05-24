const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization token required!' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) return res.status(401).json({ message: "Invalid token" });
        let user;
        switch (decoded.role) {
            case 'user':
                user = await User.findById(decoded._id);
                user = {
                    _id: user._id,
                    firstName: user.firstName,
                    role: user.role,
                }
                break;
            case 'admin':
                user = await Admin.findById(decoded._id);
                user = {
                    _id: user._id,
                    firstName: user.firstName,
                    role: user.role
                }
                break;
            default:
                return res.status(401).json({ error: 'Invalid user role!' });
        }

        if (!user) {
            return res.status(401).json({ error: `${role.charAt(0).toUpperCase() + role.slice(1)} not found!` });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Request is not authorized!', token });
    }
}

const completeMe = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization token required!' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) return res.status(401).json({ message: "Invalid token" });
        let user;
        switch (decoded.role) {
            case 'user':
                user = await User.findById(decoded._id);
                user = {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    contactNumber: user.contactNumber,
                }
                break;
            case 'admin':
                user = await Admin.findById(decoded._id);
                user = {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    contactNumber: user.contactNumber,
                }
                break;
            default:
                return res.status(401).json({ error: 'Invalid user role!' });
        }

        if (!user) {
            return res.status(401).json({ error: `${role.charAt(0).toUpperCase() + role.slice(1)} not found!` });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Request is not authorized!', token });
    }
}
module.exports = {
    requireAuth,
    completeMe
};