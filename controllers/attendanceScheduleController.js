const { AttendanceSchedule } = require("../models");
const { User } = require("../models");

exports.getAllAttendanceSchedules = async (req, res) => {
  try {
    const specificDate = new Date();
    const dayIndex = specificDate.getDay();
    const userLogin = await User.findByPk(req.userId);
    const schedules = await AttendanceSchedule.findAll({
      where: {
        company_id: userLogin.company_id,
        day_of_week: dayIndex,
        is_active: true, // Hanya ambil jadwal yang aktif
      },
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttendanceScheduleById = async (req, res) => {
  try {
    const schedule = await AttendanceSchedule.findByPk(req.params.id);
    if (schedule && schedule.is_active) {
      // Pastikan jadwal aktif
      res.json(schedule);
    } else {
      res
        .status(404)
        .json({ message: "Attendance schedule not found or inactive" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAttendanceSchedule = async (req, res) => {
  try {
    const scheduleData = {
      ...req.body,
      is_active: req.body.is_active !== undefined ? req.body.is_active : true, // Default ke true jika tidak ada
    };
    const schedule = await AttendanceSchedule.create(scheduleData);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAttendanceSchedule = async (req, res) => {
  try {
    const [updated] = await AttendanceSchedule.update(req.body, {
      where: { schedule_id: req.params.id },
    });
    if (updated) {
      const updatedSchedule = await AttendanceSchedule.findByPk(req.params.id);
      res.json(updatedSchedule);
    } else {
      res.status(404).json({ message: "Attendance schedule not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAttendanceSchedule = async (req, res) => {
  try {
    const deleted = await AttendanceSchedule.destroy({
      where: { schedule_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Attendance schedule not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
