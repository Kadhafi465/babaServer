const { Rent } = require("../models");

class RentController {
  static getAll(req, res) {
    Rent.findAll()
      .then((data) => {
        res.status(200).json(data);
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
          res.status(200).json(data);
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal Service Error",
        });
      });
  }

  static create(req, res) {
    const { tanggal, jam, tarif, status_sewa, status_booking } = req.body;
    Rent.create({
      tanggal,
      jam,
      tarif,
      status_sewa,
      status_booking,
      customerId: req.user.id,
    })
      .then((data) => {
        res.status(201).json({
          message: "Book Success",
          data,
        });
      })
      .catch((err) => {
        if (err.errors) {
          let errData = [];
          for (let i = 0; i < err.errors.length; i++) {
            errData.push(err.errors[i].message);
          }
          res.status(400).json({
            message: errData,
          });
        } else {
          res.status(500).json({
            message: "Internal Server Error",
          });
        }
      });
  }

  static update(req, res) {
    let option = { where: { id: req.params.id } };
    const { tanggal, jam, tarif, status_sewa, status_booking } = req.body;
    let input = {
      //   tanggal,
      //   jam,
      //   tarif,
      //   status_sewa,
      status_booking,
    };
    Rent.update(input, option)
      .then((data) => {
        if (data) {
          res.status(200).json(input);
        } else {
          res.status(404).json({
            message: "Book not found",
          });
        }
      })
      .catch((err) => {
        if (err.errors) {
          let errData = [];
          for (let i = 0; i < err.errors.length; i++) {
            errData.push({ message: err.errors[i].message });
          }
          res.status(400).json(errData);
        } else {
          res.status(500).json({
            message: "Internal server Error",
          });
        }
      });
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
