const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const saltRounds = 10;

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users); // Devuelve la lista de usuarios
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
}
async function createUser(req, res) {
  try {
    if(!req.body) {
      return res.status(400).json({ error: "No se ha enviado el cuerpo de la solicitud" });
    }
    const newUser = new User(req.body);
    newUser.password = await bcrypt.hash(newUser.password, saltRounds); // Hashea la contraseña
    await newUser.save(); 
    res.status(201).json(newUser); 
  } catch (error) {
    console.error("Error en createUser:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
}

async function updateUser(req, res) {
  
  try {
    const { id } = req.params;
    const body  = req.body;
    const user = await User.findByIdAndUpdate(id,body);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
     return res.status(200).send({ message: "Usuario actualizado" });
  }
  catch (error) {
    console.error("Error en updateUser:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
    
    
}
async function getUserById(req, res) {
  const { id } = req.params;
  try {
    
    const user = await User.findById(id).select({ password: 0 , __v: 0 });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.json(user);
  }
  catch (error) {
    console.error("Error en getUserById:", error);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
}
async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    
    const user = await User.findByIdAndDelete(id);
    return res.json({ message: "Usuario borrado" });
   
  }
  catch (error) {
    console.error("Error al eliminar:", error);
    res.status(500).json({ error: "Error al eliminar" });
  }
}
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById
}