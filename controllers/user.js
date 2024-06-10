const User = require('../models/users');
const bcrypt = require('bcrypt');

function isstringinvalid(string) {
    if(string === undefined || string.length === 0) {
        return true;
    } else {
        return false;
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, phonenumber, password } = req.body;
        console.log('email', email);
        if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(phonenumber) || isstringinvalid(password)) {
            return res.status(400).json({err: "Bad parameters - Something is missing"});
        }

        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ err: "User already exists" });
        }

        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            if (err) {
                return res.status(500).json({ err: "Error hashing password" });
            }
            await User.create({ name, email, phonenumber, password: hash });
            res.status(201).json({ message: 'Successfully created new user' });
        });
    } catch(err) {
        res.status(500).json({ err: "Internal Server Error" });
    }
}

module.exports = {
    signup: signup
};