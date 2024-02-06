import { Schema, model, models } from "mongoose";

const stockSchema = new Schema({
  symbol: {
    type: String,
    required: true,
  },
  companyName: { type: String, required: true },
  quantity: { type: Number, required: true },
  purchasePrice: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
const Stock = models.Stock || model("Stock", stockSchema);
export default Stock;
