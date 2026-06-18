const Service = require("../models/Service");

const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};

const createService = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      durationMinutes,
      price,
      currency,
      category,
    } = req.body;

    const service = await Service.create({
      name,
      slug,
      description,
      durationMinutes,
      price,
      currency,
      category,
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create service",
      error: error.message,
    });
  }
};

module.exports = {
  getServices,
  createService,
};