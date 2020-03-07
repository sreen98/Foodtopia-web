const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
	branch: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true
	},
	description: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	pic: {
		type: String
	},
	picMime: {
		type: String
	},
	quantity: {
		type: Number
	},
	rate: {
		type: Number,
		required: true
	},
	type: {
		type: Boolean,
		required: true
	},
	unit: {
		type: String
	}
})

module.exports = mongoose.model('product', ProductSchema)
