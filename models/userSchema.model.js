import { model, Schema } from 'mongoose'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 24
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: 'user'
	}
})


userSchema.methods.generateToken = async function () {
	return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "7d"
	})
}

const User = model('user', userSchema)


export default User;