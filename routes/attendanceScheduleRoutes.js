const express = require("express");
const router = express.Router();
const attendanceScheduleController = require("../controllers/attendanceScheduleController");
const authenticateJWT = require("../middleware/authenticateJWT");

router.get(
  "/attendance-schedules",
  authenticateJWT,
  attendanceScheduleController.getAllAttendanceSchedules
);
router.get(
  "/attendance-schedules/:id",
  attendanceScheduleController.getAttendanceScheduleById
);
router.post(
  "/attendance-schedules",
  attendanceScheduleController.createAttendanceSchedule
);
router.put(
  "/attendance-schedules/:id",
  attendanceScheduleController.updateAttendanceSchedule
);
router.delete(
  "/attendance-schedules/:id",
  attendanceScheduleController.deleteAttendanceSchedule
);

module.exports = router;
