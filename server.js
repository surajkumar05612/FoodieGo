import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// database
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err.message);
}); 

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
    res.send("Hello");
});

// cport
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`);
})