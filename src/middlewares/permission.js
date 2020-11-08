class Permission {

    static async isAdmin(req, res, next) {
        if (req.user.role == 'admin'){
            return next()
        } else {
            return res.status(403).json({
                status: 'Failed',
                error: 'You are not authorized to perform this operation'
            })
        }
    }
}

module.exports = Permission