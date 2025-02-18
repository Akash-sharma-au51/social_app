const User = require('../models/userModal');
const jwt = require('jsonwebtoken');
const bcypt = require('bcryptjs')
 

// ✅ Register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // ✅ Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        // ✅ Hash the password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // ✅ Generate JWT token
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.status(201).json({
            user: {
                email: newUser.email,
                id: newUser._id
            },
            token,
            message: "User created successfully",
            success: true
        });

    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// ✅ Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // ✅ Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // ✅ Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }

        // ✅ Generate JWT token
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            user: {
                email: user.email,
                id: user._id
            },
            token,
            message: "User logged in successfully",
            success: true
        });

    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// ✅ Logout user (Inform frontend to remove token)
const logoutUser = async (req, res) => {
    try {
        res.status(200).json({
            message: "User logged out successfully",
            success: true
        });

    } catch (error) {
        console.error("Error in logoutUser:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

module.exports = { registerUser, loginUser, logoutUser };