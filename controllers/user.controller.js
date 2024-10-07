const { userServices } = require('../services')

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
		res.json({ error: e })
	}
}


module.exports = {
	createNewUser
}