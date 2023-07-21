const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(express.json());

app.use(cors());
// Import routes
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");

// Use routes
app.use("/api/user", userRoutes);
app.use("/api", carRoutes);
app.use(express.static(path.join(__dirname, "public")));
app.get("/cars", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "cars.html"));
});

// Start the server
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
