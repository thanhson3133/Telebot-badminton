const mongoose = require("mongoose");

const DailySchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        required: true,
        unique: true
    },

    photoId: { type: String, default: "" },

    note: {
        type: String,
        default: ""
    },

    mood: {
        type: String,
        default: ""
    },

    lucky_number: Number,        
    quote_of_the_day: String,   

    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Daily", DailySchema);
