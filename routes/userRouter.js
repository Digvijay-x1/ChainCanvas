const express = require("express");
const router = express.Router();
const {registeredUser,loginUser,logout} = require('../controllers/authControllers')


router.get("/", (req, res) => {
  res.send('hellow this is the userRouter');
});

router.post("/register", registeredUser );

router.post('/login', loginUser);

router.get('/logout', logout );


module.exports = router;