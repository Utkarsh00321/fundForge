import { connectToDB } from "@utils/database";
import Gold from "@models/gold";

export const GET = async (req, { params }) => {
  try {
    connectToDB();

    const goldData = await Gold.find({ user: params.id });

    return new Response(JSON.stringify(goldData), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch the gold.", {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  const objectId = params.id;
  try {
    connectToDB();

    await Gold.deleteOne({ huid: objectId });

    return new Response("Gold deleted successfully.");
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete the gold.", {
      status: 500,
    });
  }
};
