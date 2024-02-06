import { model, models, Schema } from "mongoose";

const goldSchema = new Schema({
  huid: { type: String, required: true },
  weight: { type: Number, required: true },
  type: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Gold = models.Gold || model("Gold", goldSchema);
export default Gold;
