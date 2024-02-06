import { model, models, Schema } from "mongoose";

const realEstateSchema = new Schema({
  propertyType: { type: String, required: true },
  address: { type: String, required: true },
  squareFootage: { type: Number, required: true },
  purchasePrice: { type: Number, required: true },
  propertyId: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const RealEstate = models.RealEstate || model("RealEstate", realEstateSchema);
export default RealEstate;
