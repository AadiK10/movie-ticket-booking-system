const express = require("express");
const { addShowPage, addShow, viewShows, deleteShow, updateShow, fetchShowById } = require("../Controller/showController");
const showRouter = express.Router();



showRouter.get("/addShow",addShowPage);
showRouter.post("/addShow",addShow);
showRouter.get("/shows",viewShows);
showRouter.get("/editShow/:id", fetchShowById);
showRouter.patch("/editShow/:id", updateShow);
showRouter.delete("/deleteShow/:id",deleteShow);

module.exports = showRouter;
