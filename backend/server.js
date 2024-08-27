import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import colors from 'colors';
import Nproducts from "./routes/userRoute.js"
  
 
dotenv.config();

 

 
const app = express();
 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(morgan("dev"));

app.use('/', Nproducts);
 
 
app.get("/", (req, res) => {
  res.send("<h1>Welcome to  API service</h1>");
});

 
const PORT = process.env.PORT || 8080;

 
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
