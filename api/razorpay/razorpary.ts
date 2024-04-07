import Razorpay from "razorpay";
// key_id, key_secret;
// rzp_test_9ORRt9QRoFQhTH, TH6VeNCRfH9czTkK8RqFkTWt;


if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay key id or key secret is missing");
}

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

