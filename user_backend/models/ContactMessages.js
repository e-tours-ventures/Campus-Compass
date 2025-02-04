const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  },
  { collection: "contact_messages" } // Explicitly set the collection name
);

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
