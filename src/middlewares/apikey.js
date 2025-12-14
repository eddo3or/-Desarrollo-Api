const crypto = require('crypto');

const API_KEY = process.env.API_KEY; 
const verifyApiKey = (req, res, next) => {
  const key = req.header('api-key') || req.query.api_key;
  if (!key) {
    return res.status(401).json({ message: 'Acceso no autorizado: Falta la API key.' });
  }

  const incoming = Buffer.from(String(key), 'utf8');
  const expected = Buffer.from(String(API_KEY), 'utf8');

  if (incoming.length !== expected.length) {
    return res.status(403).json({ message: 'API key inválida.' });
  }

  try {
    const isKeyValid = crypto.timingSafeEqual(incoming, expected);
    if (!isKeyValid) {
      return res.status(403).json({ message: 'API key inválida.' });
    }
    next();
  } catch (err) {
    console.error('Error validando API Key:', err.message);
    return res.status(403).json({ message: 'API key inválida.' });
  }
};

module.exports = verifyApiKey;
