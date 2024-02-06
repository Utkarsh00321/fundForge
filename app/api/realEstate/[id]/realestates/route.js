import { connectToDB } from "@utils/database";
import RealEstate from "@models/realEstate";

export const GET = async (req, { params }) => {
  try {
    connectToDB();
    const realEstates = await RealEstate.find({ user: params.id });

    return new Response(JSON.stringify(realEstates), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch any real estate data", {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    connectToDB();
    const result = await RealEstate.deleteOne({ propertyId: params.id });
    if (result.deletedCount > 0) {
      return new Response(
        `Real Estate with propertyId ${propertyId} deleted successfully`
      );
    } else {
      return new Response(`No Real Estate found with propertyId ${propertyId}`);
    }
  } catch (error) {
    console.log(error);
    return new Response("Cannot Delete!", {
      status: 500,
    });
  }
};
