import { drinks } from "@/data/drinks";

export async function GET(request, { params }) {
  const drink = drinks.find((d) => d.id === params.id);
  if (!drink) {
    return new Response("Not found", { status: 404 });
  }
  return Response.json(drink);
}
