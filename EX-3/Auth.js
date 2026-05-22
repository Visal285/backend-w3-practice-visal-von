// auth.js - Token-based authentication middleware (Bonus)

const VALID_TOKEN = 'xyz123';

const auth = (req, res, next) => {
    const { token } = req.query;

    if (!token || token !== VALID_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token.' });
    }

    next();
};

export default auth;