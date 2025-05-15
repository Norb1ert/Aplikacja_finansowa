const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: 'Brak dostępu' });
try {

    const decoded = jwt.verify(token, 'secretkey');
    req.userId = decoded.userId
    next();
} catch(error) {
    res.status(403).json({ error: 'Token niepoprawny lub wygasł' });
}
}

module.exports = auth;