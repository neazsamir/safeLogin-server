const validator = (schema) => async (req, res, next) => {
	try {
		const parsedBody = await schema.parseAsync(req.body)
		req.body = parsedBody
		next()
	} catch (e) {
		return next({ msg: e.issues[0].message, status: 400 })
	}
}

export default validator;