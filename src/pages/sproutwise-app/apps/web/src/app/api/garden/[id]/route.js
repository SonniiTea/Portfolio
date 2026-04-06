import sql from "@/app/api/utils/sql";

// Get a single garden plant
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const result = await sql`
      SELECT ug.*, p.name, p.scientific_name, p.plant_type, p.description, 
             p.image_url as plant_image, p.water_needs, p.sun_requirement, 
             p.days_to_harvest, p.care_level
      FROM user_garden ug
      JOIN plants p ON ug.plant_id = p.id
      WHERE ug.id = ${id}
    `;

    if (result.length === 0) {
      return Response.json(
        { error: "Garden plant not found" },
        { status: 404 },
      );
    }

    return Response.json({ gardenPlant: result[0] });
  } catch (error) {
    console.error("Error fetching garden plant:", error);
    return Response.json(
      { error: "Failed to fetch garden plant" },
      { status: 500 },
    );
  }
}

// Update garden plant
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { nickname, notes, imageUrl, locationZone } = body;

    const setClauses = [];
    const values = [];
    let paramCount = 0;

    if (nickname !== undefined) {
      paramCount++;
      setClauses.push(`nickname = $${paramCount}`);
      values.push(nickname);
    }
    if (notes !== undefined) {
      paramCount++;
      setClauses.push(`notes = $${paramCount}`);
      values.push(notes);
    }
    if (imageUrl !== undefined) {
      paramCount++;
      setClauses.push(`image_url = $${paramCount}`);
      values.push(imageUrl);
    }
    if (locationZone !== undefined) {
      paramCount++;
      setClauses.push(`location_zone = $${paramCount}`);
      values.push(locationZone);
    }

    if (setClauses.length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    paramCount++;
    const query = `UPDATE user_garden SET ${setClauses.join(", ")} WHERE id = $${paramCount} RETURNING *`;
    values.push(id);

    const result = await sql(query, values);

    if (result.length === 0) {
      return Response.json(
        { error: "Garden plant not found" },
        { status: 404 },
      );
    }

    return Response.json({ gardenPlant: result[0] });
  } catch (error) {
    console.error("Error updating garden plant:", error);
    return Response.json(
      { error: "Failed to update garden plant" },
      { status: 500 },
    );
  }
}

// Delete garden plant
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result =
      await sql`DELETE FROM user_garden WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      return Response.json(
        { error: "Garden plant not found" },
        { status: 404 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting garden plant:", error);
    return Response.json(
      { error: "Failed to delete garden plant" },
      { status: 500 },
    );
  }
}
