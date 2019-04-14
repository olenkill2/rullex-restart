module.exports = {
	isAdmin: (req, res, next) =>
	{
		if(req.user.role != 'admin')
			return res.status(403).json({error: 'Ты не админ('});
		next();
	}
}