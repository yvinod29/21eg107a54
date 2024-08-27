import express from "express";
import { nproducts } from "../controller/nproducts.js";
const router=express.Router()


router.get("/test",nproducts )
export default router;
