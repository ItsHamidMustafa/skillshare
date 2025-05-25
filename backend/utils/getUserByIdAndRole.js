const User = require('../models/User');
const Admin = require('../models/Admin');

const getUserByIdAndRole = async (id, role) => {
    let Model;
    if (role === 'user') Model = User;
    else if (role === 'admin') Model = Admin;
    else throw new Error('Invalid role!');

    const user = await Model.findById(id);
    return user;
};

module.exports = { getUserByIdAndRole };