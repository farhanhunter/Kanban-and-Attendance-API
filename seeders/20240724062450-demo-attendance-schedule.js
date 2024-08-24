"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "AttendanceSchedules",
      [
        {
          company_id: 1,
          clock_in: "08:00:00",
          clock_out: "17:00:00",
          location_lat: 40.712776,
          location_long: -74.005974,
          day_of_week: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          company_id: 1,
          clock_in: "08:00:00",
          clock_out: "17:00:00",
          location_lat: 40.712776,
          location_long: -74.005974,
          day_of_week: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          company_id: 1,
          clock_in: "08:00:00",
          clock_out: "17:00:00",
          location_lat: 40.712776,
          location_long: -74.005974,
          day_of_week: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          company_id: 1,
          clock_in: "08:00:00",
          clock_out: "17:00:00",
          location_lat: 40.712776,
          location_long: -74.005974,
          day_of_week: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          company_id: 1,
          clock_in: "08:00:00",
          clock_out: "17:00:00",
          location_lat: 40.712776,
          location_long: -74.005974,
          day_of_week: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          company_id: 1,
          clock_in: "08:00:00",
          clock_out: "17:00:00",
          location_lat: 40.712776,
          location_long: -74.005974,
          day_of_week: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Tambahkan objek jadwal kehadiran lainnya
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AttendanceSchedules", null, {});
  },
};
