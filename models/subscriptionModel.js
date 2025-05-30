const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        planId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubscriptionPlan",
            required: true,
            index: true,
        },
        status: {
            type: String,
            enum: ["active", "expired", "cancelled"],
            default: "active",
            index: true,
        },
        startDate: {
            type: Date,
            default: Date.now
        },
        endDate: {
            type: Date,
            required: true
        },
        razorpayPaymentId: { type: String },  // Payment reference
        razorpayOrderId: { type: String },     // Payment order reference
        paymentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            default: null,
            index: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
            index: true,
        },
        isAllCategories: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    { timestamps: true }
);

subscriptionSchema.index(
    { userId: 1, status: 1 },
    { unique: true, partialFilterExpression: { status: "active" } }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
