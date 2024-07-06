const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const webhookSchema = new Schema({
  event: String,
  payload: Object,
  receivedAt: { type: Date, default: Date.now },
});

const webhookModel = mongoose.model("Webhook", webhookSchema);
module.exports = webhookModel;
