import jwt from 'jsonwebtoken'
import User from '../models/userSchema.model.js'


const protectAdminRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt
		if (!token) return next({ status: 401, msg: "Unauthorized - token not provided" })
		const authorized = await jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findOne({ _id: authorized?.id }).select('-password')
		if (!user || !authorized) return next({ status: 404, msg: "Unauthorized - user not found" })
		if (user.role !== "admin") return next({ status: 401, msg: "Unauthorized - only admin can access" })
		req.admin = user
		next()
	} catch (e) {
		console.log('Error protecting route: ', e)
		next(e)
	}
}

export default protectAdminRoute;