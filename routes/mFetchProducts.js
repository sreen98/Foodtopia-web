const express = require('express')
const router = express.Router()

const MUser = require('../models/MUser')
const Product = require('../models/Product');
const auth = require('../middleware/auth');

router.post(
    '/', auth,
    async (req, res) => {

        try {
            let user = await MUser.findById(req.user.id);
            console.log(user);
            if (user !== null) {

                let branchId = req.body.branchId;

                if (req.body.updateFcmToken) {
                    user.fcmToken = req.body.fcmToken;
                    user = await user.save();
                }

                let products;
                if (branchId === undefined)
                    products = await Product.find();
                else
                    products = await Product.find({ branch: branchId });

                res.json(products);
            }
            else {
                res.status(401).json({ msg: 'INVALID_USER' })
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

module.exports = router