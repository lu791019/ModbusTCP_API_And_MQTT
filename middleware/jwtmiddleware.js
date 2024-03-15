import jwt from 'jsonwebtoken'
import express from 'express'

const jwtMiddleware = async (req, res, next) => {
  let token
  try {
    token = req.headers['authorization'].split(' ')[1]
  } catch (e) {
    token = ''
  }
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      console.log('error no jwt')
      next()
    } else {
      console.log('has info')
      // 拿出info資訊
      // req.info = decoded;
      console.log(decoded)
      next()
    }
  })
}
export default jwtMiddleware
