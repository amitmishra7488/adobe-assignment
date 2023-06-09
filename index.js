const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/user.routes')
const postRoutes = require("./routes/post.routes");
const analyticRoutes = require('./routes/analytic.routes');

const app = express();

app.use(express.json());

app.use(cors())
// user main routes
app.use('/users', userRoutes);
app.use("/posts", postRoutes);
app.use('/analytics', analyticRoutes);

app.get('/', async(req,res)=>{
    res.status(200).send("Welcome to adobe-assignment");
});




connectDB();
app.listen(8080, () => {
    console.log("listening on port 8080");
})
