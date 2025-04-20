const express = require('express');
const app = express()

require("dotenv").config();

//middleware
app.use(express.json());

const PORT = process.env.PORT || 3000

const blogRoutes = require("./routes/blogRoutes");

//mount(add) the blog api routes
app.use("/api/v1", blogRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

const dbConnect = require("./config/database");
dbConnect();


//default route
app.get("/", (req,res)=>{
    res.send(`<h1> This is HOMEPAGE Baby</h1>`);
})