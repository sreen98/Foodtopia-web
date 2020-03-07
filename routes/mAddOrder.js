const axios = require('axios');
const express = require('express');
const router = express.Router();

const Order = require('../models/Order');
const auth = require('../middleware/auth');
const OrderId = require('../models/OrderId');
const Branch = require('../models/Branch');

router.post(
    '/', auth,
    async (req, res) => {
        const { name, address, pincode, amount, items, date, time, branchId } = req.body;

        let tmpDate = new Date();
        let year = tmpDate.getFullYear();
        let month = tmpDate.getMonth() + 1;
        if (month < 10)
            month = '0' + month;

        let orderId = await OrderId.findOne({ 'year': year, month: month });

        if (orderId === null) {
            orderId = new OrderId({
                year: year,
                month: month,
                count: 0
            });
        }

        let orderIdString = orderId.year + '-' + orderId.month + '-' + orderId.count;

        let tmpOrder = await Order.findOne({ orderId: orderIdString });
        while (tmpOrder !== null) {
            orderId.count = orderId.count + 1;
            orderIdString = orderId.year + '-' + orderId.month + '-' + orderId.count;
            tmpOrder = await Order.findOne({ orderId: orderIdString });
        }

        await orderId.save();

        let order = new Order({
            orderId: orderIdString,
            mUserId: req.user.id,
            name: name,
            address: address,
            pincode: pincode,
            amount: amount,
            items: items,
            status: "Pending Approval",
            date: date,
            time: time,
            branchId: branchId
        });

        try {
            await order.save();
            res.json({ status: 'order-placed' });

            let messageString = "";

            messageString = 'Order ID: ' + order.orderId;
            messageString += '\nName: ' + order.name;
            messageString += '\nAddress: ' + order.address;
            messageString += '\nPincode: ' + order.pincode;
            messageString += '\nTotal Amount: Rs ' + order.amount;
            messageString += '\nItems ->';
            let count = 1;
            order.items.some((element) => {
                messageString += '\n' + count + ". ";
                if (element.item.type)
                    messageString += 'Product: ';
                else
                    messageString += 'Service: ';
                messageString += element.item.name;
                messageString += '\nQTY: ' + element.count;
                messageString += '\nRs ' + element.item.rate + ' / ' + element.item.quantity + ' ' + element.item.unit;
                messageString += '\nAmount: ' + element.item.rate * element.count;

                count++;
            });

            let branchPhoneNumber = await Branch.findById(branchId, { phoneNumber: 1, _id: 0 });

            let response = await axios.post(
                'https://api.msg91.com/api/v2/sendsms', {
                "sender": "CLCMOB",
                "route": "4",
                "country": "91",
                "sms": [
                    {
                        "message": messageString,
                        "to": [branchPhoneNumber.phoneNumber]
                    }
                ]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'authkey': '317050AtD96E63Q4G5e3c243aP1'
                }
            });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

module.exports = router