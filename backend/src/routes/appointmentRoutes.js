const express = require("express");

const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.patch("/:id/status", updateAppointmentStatus);
router.get("/:id", getAppointmentById);

module.exports = router;
