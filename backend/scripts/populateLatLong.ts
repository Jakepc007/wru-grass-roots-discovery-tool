import fs from "fs";
import path from "path";
import { getConnection, closeConnection } from "../src/db";

const TEAM_SUFFIX = "_team1";

async function main() {
  const inputFile = path.join(__dirname, "wru_data.csv");
  const file = fs.readFileSync(inputFile, "utf-8");
  const lines = file.split("\n").filter((line) => line.trim());

  // Skip header
  lines.shift();

  const pool = await getConnection();

  for (const line of lines) {
    const [id, name, , lat, long] = line.split(";");

    // Skip if missing data
    if (!id || !lat || !long) continue;

    // Convert European decimal format (comma) to standard (period)
    const latitude = parseFloat(lat.replace(",", "."));
    const longitude = parseFloat(long.replace(",", "."));

    console.log(`Updating ${name} (ID: ${id}) - Lat: ${latitude}, Long: ${longitude}`);

    await pool
      .request()
      .input("id", parseInt(id))
      .input("latitude", latitude)
      .input("longitude", longitude)
      .query(
        `UPDATE [dbo].[Organisation${TEAM_SUFFIX}] SET Latitude = @latitude, Longitude = @longitude WHERE Id = @id`
      );
  }

  console.log("Done!");
  await closeConnection();
}

main().catch(console.error);
