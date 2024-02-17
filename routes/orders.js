const express = require("express");
const router = express.Router();
const Order = require("../models/orders");
const getOrderById = require("../middlewares/orders");

//GET
router.get("/", async (req, res) => {
  const { date, productName } = req.query;

  try {
    let orders;

    if (productName) {
      orders = await Order.find({ names: { $all: [productName] } });
    }

    if (date) {
      const splitDate = date.split("-");

      const startDate = new Date(
        Number(splitDate[0]),
        Number(splitDate[1] - 1),
        Number(splitDate[2]),
        1, // +1 for timezone
        0,
        0,
        0
      );

      const endDate = new Date(
        Number(splitDate[0]),
        Number(splitDate[1] - 1),
        Number(splitDate[2]),
        24, // +1 for timezone
        59,
        59,
        999
      );

      orders = await Order.find({
        dateOrder: {
          $gte: startDate.toISOString(),
          $lte: endDate.toISOString(),
        },
      });
    }

    if (!date && !productName) {
      orders = await Order.find();
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//GET Single user
router.get("/:id", getOrderById, (req, res) => {
  res.json(res.order);
});

//Create
router.post("/", async (req, res) => {
  const { names, users } = req.body;

  const order = new Order({
    names,
    users,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Update
router.put("/:id", getOrderById, async (req, res) => {
  const { names, users } = req.body;

  if (names.length > 0) {
    res.order.names = names;
  }

  if (users.length > 0) {
    res.order.users = users;
  }

  try {
    const updateOrder = await res.order.save();
    res.json(updateOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Delete
router.delete("/:id", getOrderById, async (req, res) => {
  try {
    await res.order.deleteOne({ _id: req.params.id });
    res.json({ message: "deleted order" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
