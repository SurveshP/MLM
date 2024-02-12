import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto'; // Import the crypto module
import UserModel from "../models/user.model.js";

function generateToken() {
    return crypto.randomBytes(20).toString('hex');
}

export async function userLogin(req, res) {
    try {
        const { emailAddress, password } = req.body;

        // Find user by email address
        const user = await UserModel.findOne({ emailAddress });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the provided password matches the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true }); // You can set other options like expiration, domain, secure, etc. as needed

        // Send the user data and token in the response
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
}

export async function userLogout(req, res) {
    try {
        // Instead of clearing localStorage here, send a response to the client to clear the token
        res.clearCookie('token'); // Clearing a cookie if token is stored in cookies

        // Alternatively, you can send a response instructing the client to clear the token from local storage
        res.status(200).json({ message: "Logged out successfully", clearToken: true });
    } catch (error) {
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
}

// // Function to send reset password email
// export async function sendResetEmail(emailAddress, token) {
//     try {
//         const mailOptions = {
//             from: 'your-email@gmail.com',
//             to: emailAddress,
//             subject: 'Password Reset',
//             html: `
//                 <p>Hello,</p>
//                 <p>You requested a password reset. Please click the link below to reset your password:</p>
//                 <a href="http://yourwebsite.com/reset-password?token=${token}">Reset Password</a>
//                 <p>If you did not request this, please ignore this email.</p>
//             `
//         };

//         await transporter.sendMail(mailOptions);
//         console.log(`Password reset email sent to ${emailAddress}`);
//     } catch (error) {
//         console.error(`Error sending password reset email: ${error}`);
//         throw new Error('Failed to send password reset email');
//     }
// }

// export async function forgotPassword(req, res) {
//     try {
//         const { emailAddress } = req.body;

//         // Find user by email address
//         const user = await UserModel.findOne({ emailAddress });
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Generate a unique token
//         const token = generateToken();

//         // Save the token and expiration timestamp in the database
//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
//         await user.save();

//         // Send reset password email
//         await sendResetEmail(emailAddress, token);

//         res.status(200).json({ message: "Reset password email sent" });
//     } catch (error) {
//         res.status(500).json({ error: error.message || "Something went wrong" });
//     }
// }