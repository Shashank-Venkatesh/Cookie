const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieparser());


const createToken = (userId) => {
    return JsonWebTokenError.sign({userId},process.env.jwt_secret, {
        expiresin:process.env.jwt_expires
    });
};


const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded payload to request object
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
  
  // 🔑 Login Route
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
  
    // ⚠️ Replace this with a real DB lookup
    if (username === "admin" && password === "password123") {
      const token = createToken("user123");
  
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
  
      return res.status(200).json({ message: "Login successful" });
    }
  
    res.status(401).json({ message: "Invalid credentials" });
  });
  
  // 🛡️ Protected Route using Middleware
  app.get("/api/protected", verifyToken, (req, res) => {
    res.status(200).json({
      message: "Access granted to protected route",
      user: req.user,
    });
  });
  
  // 🚀 Start Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });