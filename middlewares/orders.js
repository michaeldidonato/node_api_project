const Order = require("../models/orders");

const getOrderById = async (req, res, next) => {
    let order;

    try {
        order = await Order.findById(req.params.id);
       if(!order) {
        res.status(404).json({message: "Cannot find order"});
       }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

    res.order = order;

    next();
} 

module.exports = getOrderById;