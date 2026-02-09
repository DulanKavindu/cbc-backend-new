import Review from "../models/review.js";


export async function addReview(req, res) {
    try {
        const { productId, rating, comment } = req.body;
        const userName = req.user.firstname + " " + req.user.lastname; 

        const newReview = new Review({
            productId,
            userName,
            rating,
            comment
        });

        await newReview.save();
        res.json({ message: "Review added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export async function getProductReviews(req, res) {
    const productId = req.params.productId;
    try {
        const reviews = await Review.find({ productId: productId }).sort({ date: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}