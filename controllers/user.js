const User = require('../models/users');
const bcrypt = require('bcrypt');

function isStringInvalid(string) {
    return !string || string.trim() === '';
}

const signup = async (req, res) => {
    try {
        const { name, email, phonenumber, password } = req.body;

        // Check if any required field is missing
        if (isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(phonenumber) || isStringInvalid(password)) {
            return res.status(400).json({ err: "Bad parameters - Something is missing" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ err: "User already exists" });
        }

        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        await User.create({ name, email, phonenumber, password: hashedPassword });
        res.status(201).json({ message: 'Successfully created new user' });
    } catch (err) {
        console.error('Error in signup:', err);
        res.status(500).json({ err: "Internal Server Error" });
    }
}
