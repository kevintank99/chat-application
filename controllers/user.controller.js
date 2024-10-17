const { userServices } = require('../services')
const bcrypt = require('bcryptjs');

const createNewUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username) {
			res.status(400).json({ message: "Username missing" })
		}
		if (!password) {
			res.status(400).json({ message: "Password missing" })
		}
		const isUser = await userServices.checkUserExists(username)
		if (isUser) {
			res.status(409).json({ message: "Username already exists" })
		} else {


			const isUserSaved = await userServices.createUser(username, password)
			if (isUserSaved) {
				res.status(201).json({ message: "User Created successfully" })
			} else {
				res.status(500).json({ message: "Something went wrong while saving" })
			}
		}

	} catch (e) {
		console.log("error while creating user", e);
		res.status(500).json({ message: e })
	}
}

const loginUser = async(req, res) => {
	const { username, password } = req.body;
	try {
		const user = await userServices.checkUserExists(username)
		if (!user) {
				return res.status(404).json({ message: 'User not found' });
		}
		const isMatch = bcrypt.compare(password, user.password);
		if (!isMatch) {
				return res.status(401).json({ message: 'Invalid credentials' });
		}
		const token = userServices.generateToken(user);
		res.status(200).json({ message: 'User Authenticated', token });
	} catch (err) {
		console.error("Got a error while login a user", error);		
		res.status(500).json({ message: 'Internal server error' });
	}
}

module.exports = {
	createNewUser,
	loginUser
}