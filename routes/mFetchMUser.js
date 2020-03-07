const express = require('express')
const router = express.Router()

const MUser = require('../models/MUser')
const auth = require('../middleware/auth'); 

router.post(
    '/',auth,
    async (req, res) => {
        
        let user = await MUser.findById(req.user.id);

        try {
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

module.exports = router