import { connectToDB } from "@utils/database";
import FD from "@models/fd";

export const POST = async (req, res) => {
  const { bankName, principalAmount, interestRate, tenure, userId } =
    await req.json();

  try {
    await connectToDB();
    const newFd = new FD({
      bankName,
      principalAmount,
      interestRate,
      tenure,
      user: userId,
    });
    await newFd.save();

    return new Response(JSON.stringify(newFd), {
      status: 201,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to create a new fd", {
      status: 500,
    });
  }
};
