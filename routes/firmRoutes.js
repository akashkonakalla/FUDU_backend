const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');


const router = express.Router()

const { upload } = require("../config/cloudinary");

router.post(
  "/add-firm",
  verifyToken,
  upload.single("image"),
  firmController.addFirm
);


router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:firmId', firmController.deleteFirmById);


module.exports = router;