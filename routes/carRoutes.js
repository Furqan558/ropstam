const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.post("/cars", carController.createCar);
router.get("/cars", carController.getCars);
router.get("/cars/:carId", carController.getCarById);
router.put("/cars/:carId", carController.updateCar);
router.delete("/cars/:carId", carController.deleteCar);

module.exports = router;
