import { drinks } from "@/data/drinks";

export async function GET() {
  return Response.json(drinks);
}
