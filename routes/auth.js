// const express = require("express");
// const User = require("../models/User");
// const router = express.Router();
// const { body, validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// var jwt = require("jsonwebtoken");
// var fetchuser=require("../middleware/fetchuser")

// const JWT_SECRET = "Harryisagoodb$oy";

// // Create a User using: POST "/api/auth/createuser". No login required
// router.post(
//   "/createuser",
//   [
//     body("username", "Enter a valid username").isLength({ min: 3 }),
//     body("email", "Enter a valid email").isEmail(),
//     body("password", "Password must be atleast 5 characters").isLength({
//       min: 5,
//     }),
//   ],
//   async (req, res) => {
//     // If there are errors, return Bad request and the errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     // Check whether the user with this email exists already
//     try {
//       let user = await User.findOne({ email: req.body.email });
//       if (user) {
//         return res
//           .status(400)
//           .json({ error: "Sorry a user with this email already exists" });
//       }

//       const salt = await bcrypt.genSalt(10);
//       const secPass = await bcrypt.hash(req.body.password, salt);

//       // Create a new user
//       user = await User.create({
//         username: req.body.username,
//         password: secPass,
//         email: req.body.email,
//       });

//       const data = {
//         user: {
//           id: user.id,
//         },
//       };
//       const authtoken = jwt.sign(data, JWT_SECRET);

//       // res.json(user)
//       res.json({ authtoken });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error occured");
//     }
//   }
// );

// //authenticate a user using post

// router.post(
//   "/login",
//   [
//     body("email", "Enter a valid email").isEmail(),
//     body("password", "Password must be atleast 5 characters").isLength({
//       min: 5,
//     }),
//   ],
//   async (req, res) => {
//     //if there are errors returb bad request and errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body; //destructuring

//     try {
//       let user = await User.findOne({ email: email });
//       if (!user) {
//         return res.status(400).json({ error: "sorry user doesnt exist" });
//       }

//       const passwordCompare = await bcrypt.compare(password, user.password);
//       if (!passwordCompare) {
//         return res.status(400).json({ error: "sorry user doesnt exist" });
//       }

//       const data = {
//         user: {
//           id: user.id,
//         },
//       };
//       const authtoken = jwt.sign(data, JWT_SECRET);

//       res.json({ authtoken });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error occured");
//     }
//   }
// );

// //route 3 get user details of logged in user /api/auth/getuser post req

// router.post("/getuser", fetchuser ,async (req, res) => {
//     try {
//       userId=req.user.id;
//       const user = await User.findById(userId).select("-password");
//       res.send(user);
//     } catch (error) {
//       res.status(500).send("Internal Server Error occured");
//     }
//   }
// );

// module.exports = router;




const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const session = require('express-session');
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;



const app=express();


// Use express-session middleware
router.use(
  session({
    secret: "your-secret-key", // Replace with a secure secret key
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport middleware
router.use(passport.initialize());
router.use(passport.session());





// Passport Local Strategy for login
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);


// Passport serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select("-password");
    done(null, user);
  } catch (error) {
    done(error);
  }
});




// Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("username", "Enter a valid username").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        username: req.body.username,
        password: secPass,
        email: req.body.email,
      });

      res.json({ user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error occurred");
    }
  }
);



// Authenticate a user using POST
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error occurred" });
    }
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error occurred" });
      }
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});


const fetchuser = require("../middleware/fetchuser");
// Route to get user details of the logged-in user ("/api/auth/getuser" GET request)
router.get("/getuser",fetchuser, (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.send(req.user);
  } catch (error) {
    res.status(500).send("Internal Server Error occurred");
  }
});

module.exports = router;
