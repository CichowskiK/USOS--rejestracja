function requireLogin(req, res, next) {
    if (!req.session.studentId) {
        return res.redirect('/');
    }
    next();
}

module.exports = requireLogin;