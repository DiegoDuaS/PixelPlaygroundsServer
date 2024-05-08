import jwt from 'jsonwebtoken'
const SECRET = 'pixel_playstore_changedsecret'

const generateToken = (user) => {
  const access_token = jwt.sign(user, SECRET, { algorithm: 'HS256' });
  return access_token
}

const validateToken = (token) => {
  try {
    return jwt.verify(token, SECRET)
  } catch (e) {
    console.error('Invalid token', e)
    return false
  }
}

export { generateToken, validateToken }
