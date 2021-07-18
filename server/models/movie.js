const mongoose = require("mongoose");
const validator = require("validator");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  writer: {
    type: String,
  },
  Genre: {
    type: String,
  },
  production: {
    type: String,
  },
  description: {
    type: String,
  },
  length: {
    type: String,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
  time: [
    {
      type: String,
    },
  ],
  location: [
    {
      type: String,
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

// const movie = async () => {
//   const m = new Movie({
//     name: "BLACK WIDOW2",
//     writer: "Eric Pearson",
//     Genre: "Action, Adventure",
//     Production: "Marvel Studios",
//     description:
//       "Natasha Romanoff, aka Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy, and the broken relationships left in her wake long before she became an Avenger.",
//     length: "145",
//     ticketPrice: "44",
//     img: "https://resizing.flixster.com/KLCX9xZetECtMOclxgNlu7VM9OU=/fit-in/200x296.2962962962963/v1.bTsxMzg1MjA2NDtqOzE4ODgwOzEyMDA7MTY4ODsyNTAw",
//     time: [
//       "10:00-12:00",
//       "12:00-14:00",
//       "14:00-16:00",
//       "16:00-18:00",
//       "18:00-20:00",
//       "20:00-22:00",
//       "22:00-24:00",
//     ],
//     location: ["Petach-Tiqva", "Tel-Aviv", "Herzliya", "jerusalem"],
//   });
//   try {
//     // await m.save();
//   } catch (e) {
//     console.log(e);
//   }
// };

// movie();

module.exports = Movie;
