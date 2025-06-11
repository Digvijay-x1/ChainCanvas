const express = require("express");
const router = express.Router();
const {registeredUser,loginUser} = require('../controllers/authControllers')


router.get("/", (req, res) => {
  res.send('hellow this is the userRouter');
});

router.post("/register", registeredUser );

router.post('/login', loginUser);

module.exports = router;