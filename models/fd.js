import { Schema, model, models } from "mongoose";

const fdSchema = new Schema({
  bankName: { type: String, required: true },
  principalAmount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  tenure: { type: Number, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const FD = models.FD || model("FD", fdSchema);
export default FD;
