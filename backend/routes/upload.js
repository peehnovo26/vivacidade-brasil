const express = require('express');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// Upload de foto para negócio
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada' });
    }

    res.json({
      success: true,
      imageUrl: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload de múltiplas fotos
router.post('/upload-multiple', upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada' });
    }

    const images = req.files.map(file => ({
      url: file.path,
      publicId: file.filename
    }));

    res.json({
      success: true,
      images: images
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
