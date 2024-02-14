import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto'; // Import the crypto module
import UserModel from "../models/user.model.js";
import nodemailer from "nodemailer"; // Import nodemailer for sending emails

// Function to generate a random token
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

const transporter = nodemailer.createTransport({
    service: 'suryaumpteen@gmail.com', // e.g., 'gmail'
    auth: {
        user: 'suryaumpteen@gmail.com',
        pass: 'egye onio jxeo rhmt'
    }
});

async function sendPasswordResetEmail(user, resetToken) {
    try {
        await transporter.sendMail({
            from: 'suryaumpteen@gmail.com',
            to: user.emailAddress,
            subject: 'Password Reset',
            text: `Hello ${user.userName},\n\nPlease use the following link to reset your password: ${resetToken}`
        });
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Error sending password reset email');
    }
}

export async function forgotPassword(req, res) {
    try {
        let { emailAddress } = req.body;
        emailAddress = emailAddress.trim().toLowerCase(); // Trim whitespace and convert to lowercase
        console.log("emailAddress--->", emailAddress);

        // Find user by email address
        const user = await UserModel.findOne({ emailAddress });
        console.log("user--->", user);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate a reset token
        const resetToken = generateToken();

        // Update user with reset token and expiry time
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Send password reset email
        await sendPasswordResetEmail(user, resetToken);

        // Respond to the client
        res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
}

// Reset password handler
export async function resetPassword(req, res) {
    try {
        const { resetToken, newPassword } = req.body;

        // Find user by reset token
        const user = await UserModel.findOne({ resetPasswordToken: resetToken });

        if (!user) {
            return res.status(404).json({ error: "Invalid or expired reset token" });
        }

        // Check if the reset token has expired
        if (user.resetPasswordExpires < Date.now()) {
            return res.status(401).json({ error: "Reset token has expired" });
        }

        // Generate a new hashed password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password and clear reset token
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // Save the updated user
        await user.save();

        // Respond to the client
        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
}

// Method to change user password
export async function changePassword(req, res) {
    try {
        const { userId } = req.params;
        const { oldPassword, newPassword } = req.body;
    
        // Find the user by userId
        const user = await UserModel.findOne({ userId });
    
        // If user not found
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Compare old password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    
        // If old password doesn't match
        if (!passwordMatch) {
          return res.status(400).json({ message: "Old password is incorrect" });
        }
    
        // Validate new password (if required)
        // const { error } = validateUpdatePassword(newPassword);
        // if (error) {
        //   return res.status(400).json({ error: error.message });
        // }
    
        // Hash the new password
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    
        // Update user's password
        user.password = hashedNewPassword;
        await user.save();
    
        // Send success response
        res.status(200).json({ message: "Password updated successfully" });
      } catch (error) {
        // Handle errors
        res.status(500).json({ message: "Something went wrong", error: error.message });
      }
}
