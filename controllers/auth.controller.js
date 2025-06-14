import User from '../models/userSchema.model.js'
import { hashPassword, verifyPassword } from '../models/password.model.js'



export const register = async (req, res, next) => {
	try {
		const { email, password, name } = req.body
		const emailExists = await User.findOne({email})
		if (emailExists) return next({ status: 400, msg: "Email is already taken" })
		const hashedPassword = await hashPassword(password)
		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
		})
		const user = newUser.toObject()
		const isProductionV = process.env.NODE_ENV === "production"
		delete user.password
		res.cookie('jwt', await newUser.generateToken(), {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			sameSite: isProductionV ? "none" : "strict",
			secure: isProductionV,
			path: "/"
		})
		return res.status(201).json({
			success: true,
			msg: "Account created",
			user
		})
	} catch (e) {
		console.log("Error registering user: ", e)
		next(e)
	}
}

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body
		if (!email?.trim() || !password?.trim()) {
			return next({ status: 400, msg: "Invalid credentials" })
		}
		const userExists = await User.findOne({ email })
		if (!userExists) return next({ status: 400, msg: "Invalid credentials" })
		const passwordCorrect = await verifyPassword(password, userExists.password)
		if (passwordCorrect) {
			const isProductionV = process.env.NODE_ENV === "production"
			res.cookie('jwt', await userExists.generateToken(), {
				httpOnly: true,
				maxAge: 7 * 24 * 60 * 60 * 1000,
				sameSite: isProductionV ? "none" : "strict",
				secure: isProductionV,
				path: "/"
			})
			const user = userExists.toObject()
			delete user.password
			return res.json({ success: true, msg: `Welcome back ${user.name}`, user })
		} else {
			return next({ status: 400, msg: "Invalid credentials" })
		}
	} catch (e) {
		console.log("Error logging-in user: ", e)
		next(e)
	}
}

export const logout = async (req, res, next) => {
	try {
		res.cookie('jwt', '', { maxAge: 0 })
		return res.json({ success: true, msg: "Logged out" })
	} catch (e) {
		console.log("Error logging-out user: ", e)
		next(e)
	}
}

export const getUserData = async (req, res, next) => {
	try {
		return res.json({ success: true, user: req.user })
	} catch (e) {
		console.log("Error getting user data: ", e)
		next(e)
	}
}