import argon2 from 'argon2'


export const hashPassword = async (password) => {
	try {
		return await argon2.hash(password)
	} catch (e) {
		console.log("Error hashing password: ", e)
	}
}


export const verifyPassword = async (password, hash) => {
	try {
		return argon2.verify(hash, password)
	} catch (e) {
		console.log("Error verifying password: ", e)
	}
}