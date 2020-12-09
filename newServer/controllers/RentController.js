const { Rent, User } = require("../models");
const baseUrl = require("../helpers/baseUrl");

class RentController {
  static getAll(req, res) {
    Rent.findAll({ include: [{ model: User, required: false }] })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }

  static getAllUser(req, res) {
    const { id } = req.user;
    Rent.findAll({ where: { userId: id }, include: [{ model: User, required: false }] })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }

  static getOne(req, res) {
    let id = req.params.id;
    let option = { where: { id } };
    Rent.findOne(option)
      .then((data) => {
        if (!data) {
          res.status(404).json({
            message: "Data not found",
          });
        } else {
          res.status(200).json({ data });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal Service Error",
        });
      });
  }

  static create = async(req, res) => {
    try {
      const { tanggal, jam, tarif, status_sewa } = req.body;
      const userId = req.user.id
      const checkTime = await Rent.findOne({ where: { tanggal, jam } });
      if (checkTime) throw { msg: "Tanggal dan Jam sudah di booking" };
      const result = await Rent.create({ tanggal, jam, tarif, status_sewa, userId });
      res.status(201).json({
        message: "Book Success",
        data: result,
      });
    } catch (err) {
      if (err.msg) res.status(400).json(err);
      else res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static update = async(req, res) => {
    try {
      let option = { where: { id: req.params.id } };
      const rentData = await Rent.findOne(option);
      if (!rentData) throw { msg: "Data Not Found" };
      const { status_sewa } = req.body;
      let input = { status_sewa };
      if (req.user.role === 'admin') {
        if (rentData.bukti_transfer === "") throw { msg: "Butuh bukti transfer sebelum approve" };
        if (!status_sewa) throw { msg: "Butuh status sewa" };
        Rent.update(input, option)
        .then((data) => {
          if (data) {
            res.status(200).json({ message: "Book Success" });
          } else {
            res.status(404).json({
              message: "Book not found",
            });
          }
        })
      } else {
        if (req.user.id != rentData.userId) throw { msg: "Forbidden Access" };
        if (!req.file) throw { msg: "Bukti Tranfer Dibutuhkan" };
        await Rent.update({
          bukti_transfer: baseUrl + req.file.path
        }, option);
        res.status(200).json({ message: "Berhasil" });
      }
    } catch (err) {
      if (err.msg) {
        res.status(400).json({ message: err.msg });
      } else {
        res.status(500).json({
          message: "Internal Service Error",
        });
      }
    }
  }

  static delete(req, res) {
    const option = { where: { id: req.params.id } };
    let deleteData = null;
    Rent.findOne(option)
      .then((data) => {
        if (!data) {
          res.status(404).json({
            message: "Data Not Found",
          });
        } else {
          deleteData = data;
          return Rent.destroy(option);
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

module.exports = RentController;
