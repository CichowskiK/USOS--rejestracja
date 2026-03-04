function requireLogin(req, res, next) {
    if (!req.session.studentId && !req.session.adminId) {
        return res.redirect('/');
    }
    next();
}

function requireLoginAdmin(req, res, next) {
    if (!req.session.adminId) {
        const poprzednia = req.headers.referer || '/home';
        return res.redirect(poprzednia);
    }
    next();
}

function requireLoginStudent(req, res, next) {
    if (!req.session.studentId) {
        const poprzednia = req.headers.referer || '/home';
        return res.redirect(poprzednia);
    }
    next();
}

module.exports = {requireLogin, requireLoginAdmin, requireLoginStudent};