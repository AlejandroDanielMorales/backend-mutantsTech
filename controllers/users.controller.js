const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const SECRET = "mi-secretoASDASF" // Cambia esto por una variable de entorno en producción"""
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
    if (!req.body) {
      return res.status(400).json({ error: "No se ha enviado el cuerpo de la solicitud" });
    }
 //
    const { password, ...resto } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // <- ¡Acá lo esperás!

    const newUser = new User({
      ...resto,
      password: hashedPassword
    });

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
async function loginUser (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }
   
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    
    console.log(password )
    console.log(user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      user.toJSON(),
       SECRET,
       { expiresIn: "1h" });

    // Si todo va bien:
    return res.status(200).json({
      message: "Login exitoso",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,     
        role: user.rol,
        country: user.country,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isLogged: user.isLogged,
        profilePicture: user.profilePicture
      },
      token: token // envía el token al cliente
    });

  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({ error: "Error al iniciar sesión" }); 
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  loginUser
}