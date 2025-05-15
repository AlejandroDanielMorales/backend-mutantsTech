const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { uuidv4 } = require('uuid');

// Verificación de tipo MIME permitido
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido. Solo JPG, PNG o WEBP.'));
    }
};

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir;
        if (req.path.includes("/products")) {
            dir = path.join(__dirname, '../uploads/products');
        } else if (req.path.includes("/users")) {
            dir = path.join(__dirname, '../uploads/users');
        } else if (req.path.includes("/categories")) {
            dir = path.join(__dirname, '../uploads/categories');
        } else {
            dir = path.join(__dirname, '../uploads/others');
        }

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${uuidv4()}${ext}`;
        cb(null, filename);
    }
});

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

const uploadMiddlewareWebp = (req, res, next) => {
    let fieldName = 'image';
    if (req.path.includes('/users')) {
        fieldName = 'profilePicture';
    }

    upload.single(fieldName)(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (!req.file) {
            return next();
        }

        const oldPath = req.file.path;
        const newFilename = `${path.basename(req.file.filename, path.extname(req.file.filename))}.webp`;
        const newPath = path.join(path.dirname(oldPath), newFilename);

        try {
            // Convertir a WebP
            await sharp(oldPath)
                .webp({ quality: 80 })
                .toFile(newPath);

            // Eliminar el archivo original
            fs.unlinkSync(oldPath);

            // Actualizar req.file
            req.file.filename = newFilename;
            req.file.path = newPath;

            // Construir URL pública
            const baseUrlPath = req.path.includes('/users')
                ? 'users'
                : req.path.includes('/categories')
                    ? 'categories'
                    : req.path.includes('/products')
                        ? 'products'
                        : 'others';

            req.file.url = `/uploads/${baseUrlPath}/${newFilename}`;

            next();
        } catch (conversionError) {
            return res.status(500).json({
                message: 'Error al convertir imagen a WebP',
                error: conversionError.message
            });
        }
    });
};

module.exports = uploadMiddlewareWebp;
