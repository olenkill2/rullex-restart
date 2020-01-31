const router = require('express').Router();
const uploads = require('../controllers/uploadsController.js');
const path = require('path');
const multer = require('multer');
const { isAdmin } = require('../middleware/isAdmin');
const passport = require('passport');
const { JWT_auth } = require('../passport');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router
    .route('/img/')
    .post(JWT_auth, isAdmin, upload.single('image'), uploads.uploadImg);

router
    .route('/img-by-url')
    .post(JWT_auth, isAdmin, uploads.uploadImgByUrl);

router
    .route('/url')
    .get(uploads.uploadUrl);

// router
//     .route('/')
//     .get(JWT_auth, isAdmin, seo.getAll)
//     .post(JWT_auth, isAdmin, validateBody('seo'), seo.add);

// router
//     .route('/:id')
//     .delete(JWT_auth, isAdmin, seo.delete)
//     .put(JWT_auth, isAdmin, validateBody('seo'), seo.update);


module.exports = router;