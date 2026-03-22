const { Router } = require("express");
const multer = require('multer');
const path = require('path');

const {
  getMedias,
  createMedia,
  updateMedia,
  deleteMedia
} = require("../controllers/mediaController");

const router = Router();

// Configuración de Multer para almacenamiento local
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

router.get("/", getMedias);

// Usamos upload.single('imagen') para procesar el archivo que venga en el campo 'imagen'
router.post("/", upload.single('imagen'), createMedia);
router.put("/:id", upload.single('imagen'), updateMedia);

router.delete("/:id", deleteMedia);

module.exports = router;