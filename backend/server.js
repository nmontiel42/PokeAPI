const express = require("express");
const axios = require("axios");
const cors = require("cors");
require('dotenv').config();  // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;  // Get from .env file

app.post("/oauth/github", async (req, res) => {
  const { code } = req.body;

  try {
    // Intercambia el código por un token de acceso
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const accessToken = response.data.access_token;
    res.json({ token: accessToken });
  } catch (error) {
    console.error("Error obteniendo el token:", error);
    res.status(500).json({ error: "Error al obtener el token" });
  }
});

app.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});
