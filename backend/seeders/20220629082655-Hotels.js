'use strict';
const uuid=require("uuid")

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

    await queryInterface.bulkInsert('Hotels', [{
      hotelName: "Aden Hotel",
      hotelDescription: "its locayed on the beach",
      phone: "079965522333",
      hotelId: "3210f18a-e61c-4641-842c-20d664975013",
      record_status: "latest",
     }
    
    
    ,{
      hotelName: "Sana Hotel",
      hotelDescription: "its locayed on the beach",
      phone: "079965522333",
      hotelId: "7d4d43ec-971c-4044-bd82-3df5b0843b03",
      record_status: "latest",
     }], {


     });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
