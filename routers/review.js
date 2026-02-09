import express from "express";
import { addReview, getProductReviews } from "../controlers/review.js";

const reviewRouter = express.Router();

reviewRouter.post("/", addReview); 
reviewRouter.get("/:productId", getProductReviews); 

export default reviewRouter;