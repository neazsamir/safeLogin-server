import User from '../models/userSchema.model.js'


export const getUser = async (req, res, next) => {
	try {
		const userId = req.params.id
		const user = await User.findOne({ _id: userId })
		.select('-password')
		if (!user) return next({ status: 404, msg: "User not found", user: {} })
		return res.json({ success: true, user })
	} catch (e) {
		console.log("Error getting user in admin: ", e)
		next(e)
	}
}

export const getAllUser = async (req, res, next) => {
	try {
		const page = Number(req.query.page) || 1
		const limit = Number(req.query.limit) || 100
		const skip = (page - 1) * limit
		const users = await User.find()
		.skip(skip).limit(limit).select('-password')
		const length = await User.countDocuments()
		
		return res.json({ 
			success: true,
			page,
			limit,
			length,
			totalPage: Math.ceil(length / limit),
			users,
		})
	} catch (e) {
		console.log("Error getting all user in admin: ", e)
		next(e)
	}
}