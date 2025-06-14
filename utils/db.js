import mongoose from 'mongoose'


const connectDB = async () => {
	const URI = process.env.MONGODB_URI
	try {
		await mongoose.connect(URI)
		console.log('DB connected')
	} catch (e) {
		console.log('Error connecting to DB: ', e)
		process.exit()
	}
}


export default connectDB;