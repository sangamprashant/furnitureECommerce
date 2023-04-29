const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const Jwt_secret = process.env.JWT_SECRET;

const USEREC = mongoose.model("FURNITUREUSEREC");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;



//signup
router.post("/signup", async (req, res) => {
  const { name, email, password, number } = req.body;

  if (!name || !email || !password || !number) {
    return res.status(422).json({ error: "Please fill in all the fields" });
  }

  if (!passRegex.test(password)) {
    return res.status(422).json({
      error:
        "Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(422).json({ error: "Invalid email" });
  }

  if (number.length !== 10) {
    return res.status(422).json({ error: "Invalid mobile number" });
  }

  try {
    const existingUser = await USEREC.findOne({ $or: [{ email }, { number }] });
    if (existingUser) {
      return res
        .status(422)
        .json({ error: "User already exists with that email or mobile number" });
    }

  

   

    // Save user to database
    const hashedPassword = await bcrypt.hash(password, 12);

    const userec = new USEREC({
      name,
      email,
      password: hashedPassword,
      number,
    });

    const savedUser = await userec.save();
    if (savedUser) {
      return res.json({ message: "Registered successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});


//signin
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please add email and password" });
  } else if (!emailRegex.test(email)) {
    return res.status(422).json({ error: "Invalid email" });
  } 

  USEREC.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "no user with this email" });
    }

    bcrypt
      .compare(password, savedUser.password)
      .then((match) => {
        if (match) {
          const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);
          const { _id, name, email, number, Photo,sell,password } = savedUser;
          res.json({ token, user: { _id, name, email, number, Photo,sell,password } });
        } else {
          return res.status(422).json({ error: "Invalid password" });
        }
      })
      .catch((err) => console.log(err));
  });
});

//triaal toset email verification 
router.post("/signupo", async (req, res) => {
  const { name, email, password, number } = req.body;

  if (!name || !email || !password || !number) {
    return res.status(422).json({ error: "Please fill in all the fields" });
  }

  if (!passRegex.test(password)) {
    return res.status(422).json({
      error:
        "Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(422).json({ error: "Invalid email" });
  }

  if (number.length !== 10) {
    return res.status(422).json({ error: "Invalid mobile number" });
  }

  try {
    const existingUser = await USEREC.findOne({ $or: [{ email }, { number }] });
    if (existingUser) {
      return res
        .status(422)
        .json({ error: "User already exists with that email or mobile number" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "OTP for Signup Verification",
      html: `Your OTP for Signup Verification is <b>${otp}</b>. Please enter this OTP on the Signup page to complete your registration.`,
    };

    await transporter.sendMail(mailOptions);

    // Wait for user to enter OTP
    const enteredOtp = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(req.body.otp);
      }, 60000);
    });

    if (!enteredOtp || enteredOtp !== otp.toString()) {
      return res.status(422).json({ error: "Invalid OTP. Please try again." });
    }

    // Save user to database
    const hashedPassword = await bcrypt.hash(password, 12);

    const userec = new USEREC({
      name,
      email,
      password: hashedPassword,
      number,
    });

    const savedUser = await userec.save();
    if (savedUser) {
      return res.json({ message: "Registered successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});



module.exports = router;
