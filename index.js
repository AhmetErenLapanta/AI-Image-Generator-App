const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();

// Load environment variables from .env file
const port = process.env.PORT || 5000;

const app = express();

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Load OpenAI routes
app.use("/openai", require("./routes/openaiRoutes"));

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));
