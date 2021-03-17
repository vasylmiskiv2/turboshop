import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//Create new order
// POST API orders
//fetch all products
const addOrderItems= asyncHandler(async(req,res) => {
   const {
      orderItems,
      shippingAddress,
      paymentMethod, 
      itemsPrice, 
      taxPrice,
      shippingPrice,
      totalPrice
    } = req.body

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems,
            user: req.user,
            shippingAddress,
            paymentMethod, 
            itemsPrice, 
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//get order by id
//GET  api/orders/:id
const getOrderById = asyncHandler(async(req,res) => {
     const order= await (await Order.findById(req.params.id))

     if(order) {
         res.json(order)
     } else {
         res.status(404)
        throw Error ('Order not found')
     }
 })


//get api/orders/:id/pay
const updateOrderToPaid = asyncHandler(async(req,res) => {
    const order = await (await Order.findById(req.params.id))

    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

    //save db
        const updateOrder = await order.save()

    res.json(updateOrder)
    } else {
        res.status(404)
        throw Error ('Order not found')
    }
})

export {addOrderItems, getOrderById, updateOrderToPaid}
