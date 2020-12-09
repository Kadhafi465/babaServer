const express = require("express");
const router = express.Router();
const RentController = require("../controllers/RentController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage });

router.get("/", RentController.getAll);
router.get("/all-user", authentication, RentController.getAllUser);
router.get("/:id", RentController.getOne);
router.post("/", authentication, RentController.create);
router.put("/:id", authentication, upload.single("bukti_transfer"), RentController.update);
router.delete("/:id", authentication, RentController.delete);

module.exports = router;
