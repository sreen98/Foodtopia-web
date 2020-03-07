const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json({ extended: false }))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/branch', require('./routes/branch'))
app.use('/api/order', require('./routes/order'))
app.use('/api/product', require('./routes/product'))

app.use('/api/mauth', require('./routes/mAuth'))
app.use('/api/mfetchbranch', require('./routes/mFetchBranch'))
app.use('/api/mupdatemuser', require('./routes/mUpdateMUser'))
app.use('/api/mfetchmuser', require('./routes/mFetchMUser'))
app.use('/api/mfetchproducts', require('./routes/mFetchProducts'))
app.use('/api/maddorder', require('./routes/mAddOrder'))
app.use('/api/mfetchorders', require('./routes/mFetchOrders'))
app.use('/api/mcancelorder', require('./routes/mCancelOrder'))

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	)
}

let server = app.listen(PORT, () => console.log(`Server started on ${PORT}`))
