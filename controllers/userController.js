const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const signUp = async (req, res) => {
	try {
		if (req.body.metamaskAddress) {
			const { metamaskAddress } = req.body;
			const existingUser = await User.findOne({ metamaskAddress });

			if (existingUser) {
				return res.status(409).json({ message: "User already exists." });
			}
			const randomPassword = Math.random().toString(36).slice(-8);
			console.log(randomPassword);
			const hashedPassword = await bcrypt.hash(randomPassword, 10);

			const newUser = new User({
				password: hashedPassword,
				metamaskAddress, // Add the metamaskAddress to the user object
			});

			await newUser.save();

			// Sending welcome email (same as before)
			const message = `User created successfully and your new password is ${randomPassword}`;
			res.status(201).json({ message: message });
		} else {
			const { email } = req.body;
			const existingUser = await User.findOne({ email });

			if (existingUser) {
				return res.status(409).json({ message: "User already exists." });
			}
			const randomPassword = Math.random().toString(36).slice(-8);
			console.log(randomPassword);
			const hashedPassword = await bcrypt.hash(randomPassword, 10);

			const newUser = new User({
				email,
				password: hashedPassword,
				// Add the metamaskAddress to the user object
			});

			await newUser.save();

			// Sending welcome email (same as before)
			const message = `User created successfully and your new password is ${randomPassword}`;
			res.status(201).json({ message: message });
		}
	} catch (err) {
		res.status(500).json({ message: "Error creating user." });
	}
};

const signIn = async (req, res) => {
	const { email, password, metamaskAddress } = req.body;

	try {
		let user;

		if (email && password) {
			// Sign-in using email/password
			user = await User.findOne({ email });

			if (!user) {
				return res
					.status(401)
					.json({ message: "Authentication failed. User not found." });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(401)
					.json({ message: "Authentication failed. Invalid credentials." });
			}
		} else if (metamaskAddress) {
			// Sign-in using MetaMask
			user = await User.findOne({ metamaskAddress });

			if (!user) {
				return res
					.status(401)
					.json({ message: "Authentication failed. User not found." });
			}
		} else {
			return res.status(400).json({
				message:
					"Invalid request. Provide email/password or metamaskAddress for sign-in.",
			});
		}

		const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
			expiresIn: "1h", // You can adjust the token expiration time as per your needs.
		});

		res.json({ token });
	} catch (err) {
		res.status(500).json({ message: "Error during authentication." });
	}
};

module.exports = {
	signUp,
	signIn,
};
