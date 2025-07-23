import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/uploads/`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Math.floor(Math.random() * 999_999)} - ${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/webp') {
        cb(null, true);
    } else {
        cb({ message: 'File format not supported' }, false);
    }
}

const upload = multer({
    storage, 
    limits: { fileSize: 3000_000 },
    fileFilter
})

export { upload };