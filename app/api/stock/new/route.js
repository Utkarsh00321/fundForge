import { connectToDB } from "@utils/database";
import Stock from "@models/stock";

export const POST = async (req, res) => {
  const { symbol, companyName, quantity, purchasePrice, userId } =
    await req.json();
  try {
    await connectToDB();
    const newStock = new Stock({
      symbol,
      companyName,
      quantity,
      purchasePrice,
      user: userId,
    });
    await newStock.save();
    return new Response(JSON.stringify(newStock), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to add stock!", { status: 500 });
  }
};
