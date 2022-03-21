const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.model");

const upload = require("../middlewares/uploads");

const router = express.Router();

router.post(
  "/", upload.single("profileImage"),
  // body('username').isEmail(),
  body("first_name")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("First Name cannot be empty")
    .isLength({ min: 3 , max: 30 }),
   


  body("last_name")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("First Name cannot be empty")
    .isLength({ min: 3 , max: 30 }),
    
  


  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),


  body("age")
    .not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number between 1 and 120")
    .custom((val) => {
      if (val < 1 || val > 150) {
        throw new Error("Incorrect age provided");
      }
      return true;
    }),

   

);
  


router.get("", async (req, res) => {
    try {
      const users = await user.find().lean().exec();
  
      return res.status(200).send(users);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }),



module.exports = router;

