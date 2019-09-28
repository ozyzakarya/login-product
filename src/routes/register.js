require("module-alias/register");
const express = require("express");
const router = express.Router();
const crypt = require("bcrypt");
const { response } = require("@helpers");
const { users: User } = require("@models");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (user) {
    return res.status(400).json(response(false, "User has been register"))
  } else {
    const hashPassword = crypt.hashSync(password, 15);
    const payload = Object.assign(
      {},
      {
        email,
        password: hashPassword
      }
    );
    users = await User.create(payload);
    return res.status(200).json(response(true, "Register successfully", users))
  }
});

module.exports = router;
