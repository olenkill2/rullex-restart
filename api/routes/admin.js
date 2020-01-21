const router = require('express').Router();
const admin = require('../controllers/adminController.js');
const passport = require('passport');
const { isAdmin } = require('../middleware/isAdmin');
const {JWT_auth} = require('../passport');

router
	.route('/signin')
	.post(passport.authenticate('local', {session: false}), admin.signin);

// router
// 	.route('/is-admin')
// 	.get(JWT_auth, isAdmin, admin.isAdmin);

// module.exports = function(app)
// {
// 	// app.get('/admin/getUsers', passport.authenticate('jwt', {session: false}), isAdmin, admin.getUsers);
// 	// app.post('/admin/category', passport.authenticate('jwt', {session: false}), isAdmin, admin.addCategory);
// 	// app.get('/admin/category', passport.authenticate('jwt', {session: false}), isAdmin, admin.getCategory);
// 	// app.delete('/admin/category', passport.authenticate('jwt', {session: false}), isAdmin, admin.removeCategory);
// 	// app.post('/admin/up-img', passport.authenticate('jwt', {session: false}), isAdmin, upload.single('image'), admin.uploadImage);
// 	// app.post('/admin/post', passport.authenticate('jwt', {session: false}), isAdmin, admin.addPost);
// 	// app.get('/admin/post', passport.authenticate('jwt', {session: false}), isAdmin, admin.getAllPost);
// 	// app.get('/admin/post/:id', passport.authenticate('jwt', {session: false}), isAdmin, admin.getPost);
// 	// app.put('/admin/post/:id', passport.authenticate('jwt', {session: false}), isAdmin, admin.updatePost);
// 	// app.delete('/admin/post/:id', passport.authenticate('jwt', {session: false}), isAdmin, admin.removePost);
// }

module.exports = router;