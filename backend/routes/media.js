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

const { storage } = require('../config/cloudinary-config');

const upload = multer({ storage: storage });

router.get("/", getMedias);

// Usamos upload.single('imagen') para procesar el archivo que venga en el campo 'imagen'
router.post("/", upload.single('imagen'), createMedia);
router.put("/:id", upload.single('imagen'), updateMedia);

router.delete("/:id", deleteMedia);

module.exports = router;