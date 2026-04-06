import sql from "@/app/api/utils/sql";

// List user's garden plants
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "demo-user";

    const gardenPlants = await sql`
      SELECT ug.*, p.name, p.scientific_name, p.plant_type, p.image_url as plant_image, 
             p.water_needs, p.sun_requirement, p.days_to_harvest
      FROM user_garden ug
      JOIN plants p ON ug.plant_id = p.id
      WHERE ug.user_id = ${userId}
      ORDER BY ug.planted_date DESC
    `;

    return Response.json({ gardenPlants });
  } catch (error) {
    console.error("Error fetching garden:", error);
    return Response.json({ error: "Failed to fetch garden" }, { status: 500 });
  }
}

// Add a plant to user's garden
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      userId = "demo-user",
      plantId,
      nickname,
      plantedDate,
      locationZone,
      notes,
      imageUrl,
    } = body;

    if (!plantId || !plantedDate) {
      return Response.json(
        { error: "Plant ID and planted date are required" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO user_garden (user_id, plant_id, nickname, planted_date, location_zone, notes, image_url)
      VALUES (${userId}, ${plantId}, ${nickname || null}, ${plantedDate}, ${locationZone || null}, ${notes || null}, ${imageUrl || null})
      RETURNING *
    `;

    return Response.json({ gardenPlant: result[0] });
  } catch (error) {
    console.error("Error adding to garden:", error);
    return Response.json(
      { error: "Failed to add plant to garden" },
      { status: 500 },
    );
  }
}
