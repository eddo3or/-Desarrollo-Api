const express = require("express");
const controller = require("../controllers/movie.controllers");

const router = express.Router();

router.get("/",controller.findAll);
router.get("/:id",controller.findById);
router.post("/:title",controller.addMovie);
router.put("/:id",controller.updateMovie);
router.delete("/:id",controller.removeMovie);

module.exports = router;