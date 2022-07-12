const express = require("express");
const User = require("../models/user");
const router = express.Router();
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).lean().exec();
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}).lean().exec();
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

router.post("/user", async (req, res) => {
  try {
    const userToCreate = req.body.user;
    const user = await User.create(userToCreate);
    if (req.body.partner) {
      const partner = await User.findByIdAndUpdate(
        req.body.partner,
        {
          partner: user,
        },
        { upsert: true, new: true }
      )
        .populate("partner")
        .exec();
    }
    res.status(201).json(user.toJSON());
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

module.exports = router;
