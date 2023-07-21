const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
	category: { type: String, required: true },
	color: { type: String, required: true },
	model: { type: String, required: true },
	make: { type: String, required: true },
	registrationNo: { type: String, required: true },
});

module.exports = mongoose.model("Car", carSchema);
