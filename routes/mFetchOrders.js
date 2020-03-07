const express = require('express')

const auth = require('../middleware/auth')
const Order = require('../models/Order')
const router = express.Router()

router.post('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({'mUserId': req.user.id});
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
})

module.exports = router