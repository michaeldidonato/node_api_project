const User = require("../models/users");

const getUserById = async (req, res, next) => {
    let user;
    try {
      user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Cannot find user" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.user = user;
  
    console.log(user);
  
    next();
  };

module.exports = getUserById;