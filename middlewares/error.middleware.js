const errMiddleware = (err, req, res, next) => {
	const status = err?.status || 500
	const msg = err?.msg || "Internal server error"
	
	return res.status(status).json({
		msg,
		success: false
	})
}


export default errMiddleware;