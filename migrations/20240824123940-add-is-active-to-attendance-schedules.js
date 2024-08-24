"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("AttendanceSchedules", "is_active", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Atau false, tergantung kebutuhan Anda
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("AttendanceSchedules", "is_active");
  },
};
