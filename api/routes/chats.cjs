const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
    getChats,
    addChat,
} = require('../controllers/chats.cjs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Get all chat messages
router.get('/', getChats);

// Add a new chat message
router.post('/', upload.single('audio'), addChat);

module.exports = router;
