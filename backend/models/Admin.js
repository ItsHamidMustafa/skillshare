const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    joinedAt: {
        type: Date,
        default: Date.now
    },
    leftAt: {
        type: Date,
        default: null
    },
    contactNumber: {
        type: Number,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "admin",
        required: true,
    }
});

adminSchema.statics.signup = async function (adminData) {
    const { email, password, firstName, lastName, dateOfBirth, gender, contactNumber } = adminData;
    const exists = await this.findOne({ email });
    
    if (!email || !password) {
        throw Error("All fields must be filled!");
    }

    if (exists) {
        throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const admin = await this.create({ ...adminData, password: hash });
    return admin;
};

adminSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled!");
    }

    const admin = await this.findOne({ email });

    if (!admin) {
        throw Error("We cannot find a admin with that email!");
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
        throw Error("Incorrect password, please try again!");
    }

    return admin;
};

module.exports = mongoose.model('Admin', adminSchema);