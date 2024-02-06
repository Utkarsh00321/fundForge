import RealEstate from "@models/realEstate";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const {
    propertyType,
    address,
    squareFootage,
    purchasePrice,
    propertyId,
    userId,
  } = await req.json();

  try {
    connectToDB();
    const newRealEstate = new RealEstate({
      propertyType,
      address,
      squareFootage,
      purchasePrice,
      propertyId,
      user: userId,
    });
    await newRealEstate.save();

    return new Response(JSON.stringify(newRealEstate), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to add real estate", {
      status: 500,
    });
  }
};
