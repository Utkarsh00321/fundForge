import { connectToDB } from "@utils/database";
import Gold from "@models/gold";

export const POST = async (req, res) => {
  const { huid, weight, type, purchasePrice, userId } = await req.json();
  try {
    connectToDB();
    const newGold = new Gold({
      huid,
      weight,
      type,
      purchasePrice,
      user: userId,
    });
    await newGold.save();
    return new Response(JSON.stringify(newGold), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to add the gold data");
  }
};
