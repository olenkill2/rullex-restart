const admin = require('../controllers/adminController.js');
// const { validateBody, schemas } = require('../helpers/validator');
const passport = require('passport');
const { isAdmin } = require('../helpers/isAdmin');
const passportConf = require('../passport');
const multer = require('multer');

module.exports = function(app)
{
	app.post('/admin/signin', passport.authenticate('local', {session: false}), admin.signin);
	// app.get('/admin/is-admin', passport.authenticate('jwt', {session: false}), isAdmin, admin.isAdmin);
	// app.get('/admin/getUsers', passport.authenticate('jwt', {session: false}), isAdmin, admin.getUsers);
	// app.post('/admin/category', passport.authenticate('jwt', {session: false}), isAdmin, admin.addCategory);
	// app.get('/admin/category', passport.authenticate('jwt', {session: false}), isAdmin, admin.getCategory);
	// app.delete('/admin/category', passport.authenticate('jwt', {session: false}), isAdmin, admin.removeCategory);
	// app.post('/admin/up-img', passport.authenticate('jwt', {session: false}), isAdmin, upload.single('image'), admin.uploadImage);
	// app.post('/admin/post', passport.authenticate('jwt', {session: false}), isAdmin, admin.addPost);
	// app.get('/admin/post', passport.authenticate('jwt', {session: false}), isAdmin, admin.getAllPost);
	// app.get('/admin/post/:id', passport.authenticate('jwt', {session: false}), isAdmin, admin.getPost);
	// app.put('/admin/post/:id', passport.authenticate('jwt', {session: false}), isAdmin, admin.updatePost);
	// app.delete('/admin/post/:id', passport.authenticate('jwt', {session: false}), isAdmin, admin.removePost);
}