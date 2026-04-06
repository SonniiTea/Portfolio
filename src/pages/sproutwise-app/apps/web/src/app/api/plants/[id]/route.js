import sql from "@/app/api/utils/sql";

// Get a single plant by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const result = await sql`SELECT * FROM plants WHERE id = ${id}`;

    if (result.length === 0) {
      return Response.json({ error: "Plant not found" }, { status: 404 });
    }

    return Response.json({ plant: result[0] });
  } catch (error) {
    console.error("Error fetching plant:", error);
    return Response.json({ error: "Failed to fetch plant" }, { status: 500 });
  }
}
