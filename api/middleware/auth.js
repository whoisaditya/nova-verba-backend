const jwt = require('jsonwebtoken')

exports.isLoggedIn = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({
      error: true,
      code: 401,
      message: 'Access is Denied'
    })  }
  try {
    const t = token.split(" ")[1]
    req.user = jwt.verify(t, process.env.SECRET_KEY)
    next()
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: true,
      code: 400,
      message: 'Token is Invalid'
    })
  }
}