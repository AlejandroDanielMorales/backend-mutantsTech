const jwt = require("jsonwebtoken");
const SECRET = "mi-secretoASDASF"; // Cambia esto por una variable de entorno en producción


function isAuth(req, res, next) {
    const token = req.headers.access_token ;

    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido" });
        }
        req.user = decoded;
        next();
    });
}

module.exports = isAuth;