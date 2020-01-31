const adminRoutes = require('./admin');
const usersRoutes = require('./users');
const menuRoutes = require('./menu');
const postsRoutes = require('./posts');
const modesRoutes = require('./modes');
const roulettesRoutes = require('./roulettes');
const freebiesRoutes = require('./freebies');
const seoRoutes = require('./seo');
const uploadRoutes = require('./uploads');
const error = require('../middleware/error');

module.exports = function(app, db) {
    app.use('/api/v1/admin', adminRoutes);
    app.use('/api/v1/users', usersRoutes);
    app.use('/api/v1/roulettes', roulettesRoutes);
    app.use('/api/v1/post', postsRoutes);
    app.use('/api/v1/modes', modesRoutes);
    app.use('/api/v1/menu', menuRoutes);
    app.use('/api/v1/freebies', freebiesRoutes);
    app.use('/api/v1/uploads', uploadRoutes);
    app.use('/api/v1/seo', seoRoutes);
    app.use(error);
}