const Car = require("../models/Car");

const createCar = async (req, res) => {
	const { category, color, model, make, registrationNo } = req.body;

	try {
		const newCar = new Car({
			category,
			color,
			model,
			make,
			registrationNo,
		});

		await newCar.save();
		res.status(201).json(newCar);
	} catch (err) {
		res.status(500).json({ message: "Error creating car." });
	}
};

const getCars = async (req, res) => {
	try {
		const car = await Car.find();

		if (!car) {
			return res.status(404).json({ message: "Car not found." });
		}

		res.json(car);
	} catch (err) {
		res.status(500).json({ message: "Error getting car." });
	}
};
const getCarById = async (req, res) => {
	const { carId } = req.params;

	try {
		const car = await Car.findById(carId);

		if (!car) {
			return res.status(404).json({ message: "Car not found." });
		}

		res.json(car);
	} catch (err) {
		res.status(500).json({ message: "Error getting car." });
	}
};

const updateCar = async (req, res) => {
	const { carId } = req.params;
	const { category, color, model, make, registrationNo } = req.body;

	try {
		const car = await Car.findById(carId);

		if (!car) {
			return res.status(404).json({ message: "Car not found." });
		}

		car.category = category;
		car.color = color;
		car.model = model;
		car.make = make;
		car.registrationNo = registrationNo;

		await car.save();
		res.json(car);
	} catch (err) {
		res.status(500).json({ message: "Error updating car." });
	}
};

const deleteCar = async (req, res) => {
	const { carId } = req.params;

	try {
		const car = await Car.findByIdAndDelete(carId);

		if (!car) {
			return res.status(404).json({ message: "Car not found." });
		}

		res.json({ message: "Car deleted successfully." });
	} catch (err) {
		res.status(500).json({ message: "Error deleting car." });
	}
};

module.exports = {
	createCar,
	getCars,
	getCarById,
	updateCar,
	deleteCar,
};
