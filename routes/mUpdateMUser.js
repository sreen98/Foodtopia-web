const express = require('express')
const router = express.Router()

const MUser = require('../models/MUser')
const auth = require('../middleware/auth'); 

router.post(
    '/',auth,
    async (req, res) => {
        const { name, address, pincode } = req.body;
        
        let user = await MUser.findById(req.user.id);
        user.name = name;
        user.address = address;
        user.pincode = pincode;

        try {
            user = await user.save();
            res.json({status: 'updated'});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

module.exports = router