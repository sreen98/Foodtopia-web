const express = require('express');
const router = express.Router();

const Order = require('../models/Order');
const auth = require('../middleware/auth');

router.post(
    '/', auth,
    async (req, res) => {
        try {
            let order = await  Order.findById(req.body.id);
            if (order.status === 'Pending Approval') {
                order.status = 'Cancelled';
                await order.save();
                res.json({ status: 'order-cancelled' });
            }
            else
                res.json({ statys: 'error' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

module.exports = router