import { connectToDB } from "@utils/database";
import FD from "@models/fd";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const fds = await FD.find({ user: params.id });
    return new Response(JSON.stringify(fds), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch any Fixed Deposits", {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await FD.findByIdAndDelete(params.id);

    return new Response("FD deleted successfully!");
  } catch (error) {
    return new Response("Failed to delete FD", { status: 500 });
  }
};
