import express from "express";
import cors from "cors";
import { getConnection } from "./db";

const app = express();
const PORT = process.env.PORT || 3000;
const TEAM_SUFFIX = "_team1";

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Teams
app.get("/teams", async (_req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT * FROM [dbo].[Team${TEAM_SUFFIX}]`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Organisations
app.get("/organisations", async (_req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT * FROM [dbo].[Organisation${TEAM_SUFFIX}]`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Organisation Types
app.get("/organisation-types", async (_req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT * FROM [dbo].[OrganisationType${TEAM_SUFFIX}]`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Game Formats
app.get("/game-formats", async (_req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT * FROM [dbo].[GameFormat${TEAM_SUFFIX}]`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Sex
app.get("/sexes", async (_req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT * FROM [dbo].[Sex${TEAM_SUFFIX}]`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.post("/sexes", async (req, res) => {
  try {
    const { id, value } = req.body;
    const pool = await getConnection();
    await pool.request()
      .input("id", id)
      .input("value", value)
      .query(`INSERT INTO [dbo].[Sex${TEAM_SUFFIX}] (Id, Value) VALUES (@id, @value)`);
    res.status(201).json({ id, value });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Team Templates
app.get("/team-templates", async (_req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT * FROM [dbo].[TeamTemplate${TEAM_SUFFIX}]`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Teams by organisation
app.get("/organisations/:id/teams", async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("orgId", parseInt(id))
      .query(`
        SELECT
          tt.Name as TeamName,
          o.Name as OrganisationName,
          o.Id as OrganisationId,
          o.Latitude,
          o.Longitude,
          tt.MinAge,
          tt.MaxAge,
          s.Value as Sex
        FROM Team${TEAM_SUFFIX} t
        JOIN TeamTemplate${TEAM_SUFFIX} tt ON t.TeamTemplateId = tt.Id
        JOIN Organisation${TEAM_SUFFIX} o ON t.OrganisationId = o.Id
        LEFT JOIN Sex${TEAM_SUFFIX} s ON t.SexId = s.Id
        WHERE o.Id = @orgId
      `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Teams near location (within map bounds)
app.get("/teams/nearby", async (req, res) => {
  try {
    const { minLat, maxLat, minLng, maxLng } = req.query;
    const pool = await getConnection();
    const result = await pool.request()
      .input("minLat", parseFloat(minLat as string))
      .input("maxLat", parseFloat(maxLat as string))
      .input("minLng", parseFloat(minLng as string))
      .input("maxLng", parseFloat(maxLng as string))
      .query(`
        SELECT
          tt.Name as TeamName,
          o.Name as OrganisationName,
          o.Id as OrganisationId,
          o.Latitude,
          o.Longitude,
          tt.MinAge,
          tt.MaxAge,
          s.Value as Sex
        FROM Team${TEAM_SUFFIX} t
        JOIN TeamTemplate${TEAM_SUFFIX} tt ON t.TeamTemplateId = tt.Id
        JOIN Organisation${TEAM_SUFFIX} o ON t.OrganisationId = o.Id
        LEFT JOIN Sex${TEAM_SUFFIX} s ON t.SexId = s.Id
        WHERE o.Latitude BETWEEN @minLat AND @maxLat
          AND o.Longitude BETWEEN @minLng AND @maxLng
      `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
