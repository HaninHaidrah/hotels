'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('Rooms', [{
      roomName: "single Room",
    roomDescription: "one big room",
    roomFacilites: "wifi ",
    roomId: "b846f14b-f442-4458-9edf-4db1fa96ce94",
    record_status: "latest"
     },
     {
      roomName: "Double Room",
     roomDescription: "one big room",
     roomFacilites: "romm service  ",
     roomId: "988842e9-957b-43c8-b502-3750bfd1f1c1",
     record_status: "latest"
    },
    {
      roomName: "sweet Room",
     roomDescription: "one big room",
     roomFacilites: "romm service  ",
     roomId: "ab78c857-4c86-4ed8-ae17-32e16d25cec4",
     record_status: "latest"
    }

    
    
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
