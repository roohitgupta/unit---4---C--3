const mongoose = require("mongoose");

const PublicationSchema = new mongoose.Schema(
  {
    Name : { type: String, required: true },
   
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Publication", PublicationSchema);
