const express = require("express")
const router = express.Router()
const Payment = require("../model/payment-model.js")
const razorpay = require("../config/razorpay")
const { isLoggedIn } = require("../middlewear/login-middlewear.js")
const userModel = require("../model/user-model.js")

router.get("/",function(req,res){
    res.render("user_login")
})

router.post('/create/orderId', isLoggedIn,async (req, res) => {
    let user = await userModel.findOne({email:req.user.email}).populate({
        path:"cart",
        populate:{
            path:"product"
        }
    })
    var totalPrice = 0
    user.cart.forEach(function(item){
        totalPrice += item.product.price * item.quantity
    })
    const options = {
      amount: totalPrice * 100, 
      currency: "INR",
    };
    try {
      const order = await razorpay.orders.create(options);
      res.send(order);
  
      const newPayment = await Payment.create({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        status: 'pending',
      });
  
    } catch (error) {
      res.status(500).send('Error creating order');
    }
  });

  router.post('/api/payment/verify',isLoggedIn, async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET
  
    try {
      const { validatePaymentVerification } = require('../node_modules/razorpay/dist/utils/razorpay-utils.js')
  
      const result = validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
      if (result) {
        const payment = await Payment.findOne({ orderId: razorpayOrderId });
        payment.paymentId = razorpayPaymentId;
        payment.signature = signature;
        payment.status = 'completed';
        await payment.save();
        res.json({ status: 'success' });
      } else {
        res.status(400).send('Invalid signature');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Error verifying payment');
    }
  });

module.exports = router