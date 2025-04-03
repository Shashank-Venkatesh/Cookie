const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(express.json()); 
app.use(cookieParser());

// Get cookies [READ]
app.get("/get-cookies", (req, res) => {
    res.json({ cookies: req.cookies });
});

// Post cookie [CREATE]
app.post("/send-cookie", (req, res) => {
    const { name, value } = req.body;

    res.cookie(name, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'production',
        maxAge: 3600000 // 1 hour
    });

    res.json({ message: `Cookie ${name} set successfully!` });
});

// Update cookie [UPDATE]
app.put("/update-cookie", (req, res) => {
    const { name, value } = req.body;

    if (!req.cookies[name]) {
        return res.status(400).json({ message: `Cookie ${name} does not exist!` });
    }

    res.cookie(name, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'production',
        maxAge: 3600000
    });

    res.json({ message: `Cookie ${name} updated successfully!` });
});

// Delete cookie [DELETE]
app.delete("/delete-cookie", (req, res) => {
    const { name } = req.body;

    if (!req.cookies[name]) {
        return res.status(400).json({ message: `Cookie ${name} does not exist!` });
    }

    res.clearCookie(name);
    res.json({ message: `Cookie ${name} deleted successfully!` });
});

app.listen(port, () => {
    console.log(`Server running @ port: ${port}`);
});
