const Users = require('../model/userModal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register User
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await Users.create({
            username,
            email,
            password: hashedPassword
        });

        // Generate JWT Token
        const token = jwt.sign(
            { user_id: newUser._id, email: newUser.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.status(201)
            .cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000 }) // 1h expiration
            .json({
                message: "User created successfully",
                success: true,
                token,
                user: {
                    id: newUser._id,
                    email: newUser.email
                }
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Email or password do not match",
                success: false
            });
        }

        // Generate a new token
        const token = jwt.sign(
            { user_id: user._id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.status(200)
            .cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000 }) // 1h expiration
            .json({
                message: `Welcome back, ${user.email}`,
                success: true,
                token
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Logout User
const logoutUser = async (req, res) => {
    try {
        res.status(200)
            .clearCookie("token", { httpOnly: true, secure: true })
            .json({ message: "User logged out successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = { registerUser, loginUser, logoutUser };
