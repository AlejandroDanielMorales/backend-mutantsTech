const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir;
        if (req.path.includes("/products")) {
            dir = path.join(__dirname, '../uploads/products');
        } else if (req.path.includes("/users")) {
            dir = path.join(__dirname, '../uploads/users');
        } else if (req.path.includes("/categories")) {
            dir = path.join(__dirname, '../uploads/categories');
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${v4()}${ext}`;
        cb(null, filename);
    }
});

// ACA la magia:
const uploadMiddleware = (req, res, next) => {
    let fieldName = 'image'; // default

    if (req.path.includes('/users')) {
        fieldName = 'profilePicture';
    }

    const upload = multer({ storage }).single(fieldName);
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).send({ message: err.message });
        }
        next();
    });
};

module.exports = uploadMiddleware;
