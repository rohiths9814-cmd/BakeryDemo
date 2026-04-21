import "dotenv/config";
import express from "express";
import cors from "cors";
import Razorpay from "razorpay";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["POST"],
  })
);

// ── Razorpay Instance ──────────────────────────────────────
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ── POST /api/create-order ─────────────────────────────────
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    // Validate amount (minimum 100 paise = ₹1)
    if (!amount || amount < 100) {
      return res.status(400).json({
        error: "Invalid amount. Minimum is 100 paise (₹1).",
      });
    }

    const options = {
      amount: Number(amount),
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Razorpay create-order error:", err);

    if (err.statusCode === 401) {
      return res.status(401).json({ error: "Razorpay authentication failed." });
    }

    return res.status(500).json({
      error: "Failed to create order. Please try again.",
    });
  }
});

// ── POST /api/verify-payment ───────────────────────────────
app.post("/api/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        error: "Missing required payment verification fields.",
        verified: false,
      });
    }

    // HMAC-SHA256 signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(razorpay_signature)
    );

    if (isValid) {
      return res.status(200).json({
        verified: true,
        message: "Payment verified successfully.",
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      });
    } else {
      return res.status(400).json({
        verified: false,
        error: "Payment signature verification failed. Do NOT fulfil this order.",
      });
    }
  } catch (err) {
    console.error("Verify-payment error:", err);
    return res.status(500).json({
      verified: false,
      error: "Verification failed due to a server error.",
    });
  }
});

// ── Serve static build in production ───────────────────────
const distPath = join(__dirname, "dist");
app.use(express.static(distPath));
app.get("/{*splat}", (_req, res) => {
  res.sendFile(join(distPath, "index.html"));
});

// ── Start ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🧁 Sweet Crumbs API server running on http://localhost:${PORT}`);
});
