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

app.post('/api/login',(req,res)=>{
    const {username,password} = req.body;


    if(username === "admin" && password === "password123") {
        const token = createToken("user123");
        
        res.cookie("jwt",token, {
            httpOnly:true,
            secure:false,
            maxAge:24*60*60*1000
        })

        return res.status(200).json({message:"Login successfully"});
    }

    res.status(401).json({message:"Invalid credential"})

})

app.get("/api/protected", (req, res) => {
    const token = req.cookies.jwt;
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ message: "Access granted", user: decoded });
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  });
  
  // Start server
  const PORT = process.env.port;
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });