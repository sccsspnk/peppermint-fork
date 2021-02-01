const mongoose = require("mongoose");
const Log = mongoose.model("Log");

exports.createLog = async (req, res) => {
  console.log(req.body);
  console.log(req.user._id);

  try {
    const { ticket, date, time, activity } = req.body;
    if (!ticket || !date || !time || !activity) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const log = await new Log({
        ticket : mongoose.Types.ObjectId(ticket),
        date,
        time,
        activity,
        user : req.user._id
    })
    log.save().then(() => {
        res.status(201).json({ message: 'TimeLog added correctly'})
    })
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "There has been an error!" });
  }
};