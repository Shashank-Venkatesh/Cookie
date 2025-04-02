const express = require("express");
const cookieparser = require("cookie-parser");

const app = express()
const port =  3000

app.use(express.json())
app.use(cookieparser())


app.get("/get-cookie",(req,res)=>{
    res.json({cookie:req.cookies});
})

app.post("/send-cookie",(req,res)=>{
    const {name,value} = req.body;


    res.cookie(name,value, {
        httpOnly:true,
        secure:false,
        maxAge:7*24*60*60*1000
    })
    
    res.json({message:`Cookie ${name} set successfully!!!!!`})
})

app.listen(port,()=>{
    console.log(`server running @ port : ${port}`)
})