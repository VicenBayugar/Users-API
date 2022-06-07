const express = require("express");
const userSchema = require("../models/user");
const bcrypt = require("bcryptjs");
const router = express.Router();

// rutas de usuarios

// método post para crear usuario
router.post("/users", async (req, res) => {
  const { email, password } = req.body;
  let emailRecibido = await userSchema.findOne({ email });

  if (emailRecibido) {
    return res.status(400).json({ msg: "El usuario ya existe" });
  }

  const user = userSchema(req.body);

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// método para obtener todos los usuarios
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// método para obtener un sólo usuario por el id
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// actualizar un usuario
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// eliminar un usuario
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
