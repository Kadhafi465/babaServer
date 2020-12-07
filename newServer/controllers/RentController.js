const { Rent } = require("../models");

class RentController {
  static getAll(req, res) {
    Rent.findAll()
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

  static create(req, res) {
    const { tanggal, jam, tarif, status_sewa } = req.body;
    let option = { where: { tanggal } };
    let check = { where: { jam } };
    Rent.findOne(option)
      // .then((date) => {
      //   if (date) {
      //     res.status(400).json({
      //       message: "tanggal already exist",
      //     });
      //   } else {
      //     return Rent.findOne(check);
      //   }
      // })
      // .then((data) => {
      //   if (data) {
      //     res.status(400).json({
      //       message: "time already exist",
      //     });
      //   } else {
      //     console.log("bikin jadwal");
      //     return Rent.create({
      //       tanggal,
      //       jam,
      //       tarif,
      //       status_sewa,
      //       userId: req.user.id,
      //     });
      //   }
      // })
      // .then((data) => {
      //   res.status(201).json({
      //     message: "Book Success",
      //     data,
      //   });
      // })
      // .catch((err) => {
      //   console.log("error bos");
      //   if (err.errors) {
      //     let errData = [];
      //     for (let i = 0; i < err.errors.length; i++) {
      //       errData.push(err.errors[i].message);
      //     }
      //     res.status(400).json({
      //       message: errData,
      //     });
      //   } else {
      //     res.status(500).json({
      //       message: "Internal Server Error",
      //     });
      //   }
      // });
      .then((date) => {
        if (date) {
          
        }
      })
  }

  static update(req, res) {
    let option = { where: { id: req.params.id } };
    const { status_sewa } = req.body;
    let input = { status_sewa };
    Rent.update(input, option)
      .then((data) => {
        if (data) {
          res.status(200).json({ message: "Book Success", data });
        } else {
          res.status(404).json({
            message: "Book not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal Service Error",
        });
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
