const { Op, where } = require("sequelize");
const { Attendance, AttendanceSchedule, User } = require("../models");

exports.getAllAttendances = async (req, res) => {
  console.log(req.userId);
  try {
    const attendances = await Attendance.findAll({
      where: {
        user_id: req.userId,
      },
    });
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (attendance) {
      res.json(attendance);
    } else {
      res.status(404).json({ message: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    console.log(req.body); // Log request body untuk debugging
    const { schedule_id, attendance_time, attendance_type } = req.body;
    const userId = req.userId;

    // Cari user untuk mendapatkan company_id
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validasi data
    if (!schedule_id || !attendance_time || !attendance_type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Pastikan schedule_id ada
    const schedule = await AttendanceSchedule.findByPk(schedule_id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Proses waktu kehadiran sebagai objek Date
    const attendanceDate = new Date(attendance_time);
    const startOfDay = new Date(attendanceDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(attendanceDate.setHours(23, 59, 59, 999));

    // Cek apakah pengguna sudah mencatat kehadiran untuk hari ini
    const existingAttendance = await Attendance.findOne({
      where: {
        user_id: userId,
        schedule_id: schedule_id,
        attendance_type: "clock_out",
        attendance_time: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: "Attendance already recorded for today" });
    }

    // Buat kehadiran baru
    const attendance = await Attendance.create({
      user_id: userId,
      company_id: user.company_id,
      schedule_id,
      attendance_time: new Date(),
      attendance_type,
    });

    res.status(201).json(attendance);
  } catch (error) {
    console.error("Error creating attendance:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const [updated] = await Attendance.update(req.body, {
      where: { attendance_id: req.params.id },
    });
    if (updated) {
      const updatedAttendance = await Attendance.findByPk(req.params.id);
      res.json(updatedAttendance);
    } else {
      res.status(404).json({ message: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const deleted = await Attendance.destroy({
      where: { attendance_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
