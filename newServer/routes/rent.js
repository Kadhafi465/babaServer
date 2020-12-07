const express = require("express");
const router = express.Router();
const RentController = require("../controllers/RentController");
const authentication = require("../middlewares/authentication");

router.get("/", RentController.getAll);
router.get("/:id", RentController.getOne);
router.post("/", authentication, RentController.create);
router.put("/:id", RentController.update);
router.delete("/:id", RentController.delete);

module.exports = router;
