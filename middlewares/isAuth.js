const jwt = require("jsonwebtoken");
const SECRET = "mi-secretoASDASF"; // Cambia esto por una variable de entorno en producción

function isAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido" });
        }
        req.user = decoded;
        next();
    });
}

module.exports = isAuth;
