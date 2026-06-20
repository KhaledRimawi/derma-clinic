const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const Service = require("../models/Service");

const createAppointment = async (req, res) => {
  try {
    const {
      service,
      fullName,
      email,
      phone,
      country,
      city,
      mainComplaint,
      age,
      gender,
      problemDuration,
      currentMedications,
      allergies,
      pregnancyOrBreastfeeding,
      additionalNotes,
      preferredDate,
      preferredTime,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(service)) {
      return res.status(400).json({
        message: "Invalid service ID",
      });
    }

    const existingService = await Service.findById(service);

    if (!existingService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    const appointment = await Appointment.create({
      service,
      fullName,
      email,
      phone,
      country,
      city,
      mainComplaint,
      age,
      gender,
      problemDuration,
      currentMedications,
      allergies,
      pregnancyOrBreastfeeding,
      additionalNotes,
      preferredDate,
      preferredTime,
    });

    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to create appointment",
      error: error.message,
    });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("service", "name durationMinutes price currency")
      .sort({ createdAt: -1 });

    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
};
