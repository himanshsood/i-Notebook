// var jwt = require('jsonwebtoken');
// const JWT_SECRET = 'Harryisagoodb$oy';

// const fetchuser = (req, res, next) => {
//     // Get the user from the jwt token and add id to req object
//     const token = req.header('auth-token');
//     if (!token) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }
//     try {
//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = data.user;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }

// }


// module.exports = fetchuser;

const fetchuser = (req, res, next) => {
  // Check if user is authenticated
  if (req.isAuthenticated()) {
    // Attach the user to the request object
    req.user = req.session.passport.user;
  }

  // Continue to the next middleware or route handler
  next();
};

module.exports = fetchuser;


