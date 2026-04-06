import sql from "@/app/api/utils/sql";

// List plants with optional filtering
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const zone = searchParams.get("zone");
    const plantType = searchParams.get("type");
    const careLevel = searchParams.get("careLevel");
    const search = searchParams.get("search");

    let query = "SELECT * FROM plants WHERE 1=1";
    const values = [];
    let paramCount = 0;

    if (zone) {
      paramCount++;
      query += ` AND $${paramCount} = ANY(hardiness_zones)`;
      values.push(zone);
    }

    if (plantType) {
      paramCount++;
      query += ` AND plant_type = $${paramCount}`;
      values.push(plantType);
    }

    if (careLevel) {
      paramCount++;
      query += ` AND care_level = $${paramCount}`;
      values.push(careLevel);
    }

    if (search) {
      paramCount++;
      query += ` AND (LOWER(name) LIKE LOWER($${paramCount}) OR LOWER(description) LIKE LOWER($${paramCount}))`;
      values.push(`%${search}%`);
    }

    query += " ORDER BY name ASC";

    const plants = await sql(query, values);
    return Response.json({ plants });
  } catch (error) {
    console.error("Error fetching plants:", error);
    return Response.json({ error: "Failed to fetch plants" }, { status: 500 });
  }
}
