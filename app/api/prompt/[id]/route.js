import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) return Response("prompt not found", { status: 404 })

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response("failed to fetch prompt", { status: 500 })

  }
}

//PATCH (uptate)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) return Response("prompt not found", { status: 404 })

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 })

  } catch (error) {
    return new Response("failed to update the prompt", { status: 500 })
  }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);
    return new Response('prompt deleted successfully', { status: 200 })
  } catch (error) {
    return new Response("failed to delete the prompt", { status: 500 })
  }
}