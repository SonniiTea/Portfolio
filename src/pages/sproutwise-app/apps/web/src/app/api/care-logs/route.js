import sql from "@/app/api/utils/sql";

// Get care logs for a garden plant
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const gardenId = searchParams.get("gardenId");

    if (!gardenId) {
      return Response.json({ error: "Garden ID is required" }, { status: 400 });
    }

    const logs = await sql`
      SELECT * FROM care_logs 
      WHERE user_garden_id = ${gardenId}
      ORDER BY logged_at DESC
    `;

    return Response.json({ logs });
  } catch (error) {
    console.error("Error fetching care logs:", error);
    return Response.json(
      { error: "Failed to fetch care logs" },
      { status: 500 },
    );
  }
}

// Create a care log entry
export async function POST(request) {
  try {
    const body = await request.json();
    const { gardenId, activityType, notes } = body;

    if (!gardenId || !activityType) {
      return Response.json(
        { error: "Garden ID and activity type are required" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO care_logs (user_garden_id, activity_type, notes)
      VALUES (${gardenId}, ${activityType}, ${notes || null})
      RETURNING *
    `;

    return Response.json({ log: result[0] });
  } catch (error) {
    console.error("Error creating care log:", error);
    return Response.json(
      { error: "Failed to create care log" },
      { status: 500 },
    );
  }
}
