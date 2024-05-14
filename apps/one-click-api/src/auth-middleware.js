export const requiresAuth = async (req, res, next) => {

    const admin = req.firebaseAdmin;
    const authService = admin.auth();

    if (!req.body.isInternal) {
        const idToken = req?.headers?.authorization;
        let decodedIdToken;
        try {
            if (idToken)
                decodedIdToken = await authService.verifyIdToken(idToken);
            else {
                return next(res.status(401).send({ error: 'You are not authorized to make this request' }));
            }
        } catch (error) {
            next(error);
        }
    }
    next();
}

//module.exports = requiresAuth;