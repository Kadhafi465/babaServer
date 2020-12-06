const express = require("express");
const router = express.Router();
const rentRouter = require("./rent");
const UserController = require("../controllers/UserController");

router.get("/", (req, res) =>
  res.json({ message: "Welcome to Futsal Application" })
);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/", UserController.getAll);
router.delete("/:id", UserController.delete);

router.use("/rent", rentRouter);

module.exports = router;
