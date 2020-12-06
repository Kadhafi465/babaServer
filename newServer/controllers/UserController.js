const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { compare } = require("../helpers/bcrypt");

class UserController {
  static register(req, res) {
    const { email, password, role, nama, alamat, telepon, ttl } = req.body;
    let option = { where: { email } };
    User.findOne(option)
      .then((data) => {
        if (data) {
          res.status(400).json({
            message: "User already exist",
          });
        } else {
          return User.create({
            email,
            password,
            role,
            nama,
            alamat,
            telepon,
            ttl,
          });
        }
      })
      .then((user) => {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.SECRET
        );
        res.status(201).json({ nama, token });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal Service Error",
        });
      });
  }

  static login(req, res) {
    const { email, password } = req.body;
    let option = { where: { email } };
    User.findOne(option)
      .then((user) => {
        if (!user) {
          res.status(404).json({
            message: "User Not Found",
          });
        } else {
          if (compare(password, user.password)) {
            const token = jwt.sign(
              {
                id: user.id,
                email: user.email,
              },
              process.env.SECRET
            );
            const nama = user.nama;
            console.log("Betul");
            res.status(201).json({ nama, token });
          } else {
            res.status(400).json({
              message: "wrong password",
            });
          }
        }
      })
      .catch((err) => {
        console.log("salah");
        res.status(500).json({
          message: "Internal Service Error",
        });
      });
  }

  static getAll(req, res) {
    User.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }

  static delete(req, res) {
    const option = { where: { id: req.params.id } };
    let deleteData = null;
    User.findOne(option)
      .then((data) => {
        if (!data) {
          res.status(404).json({
            message: "Data Not Found",
          });
        } else {
          deleteData = data;
          return User.destroy(option);
        }
      })
      .then(() => {
        res.status(200).json({
          deleteData,
          message: "Has been Deleted",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal server Error",
        });
      });
  }
}

module.exports = UserController;
