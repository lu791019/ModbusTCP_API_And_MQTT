import express from 'express'
import router from '@/router/router.js'

import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())

// Swagger設定
const options = {
  swaggerDefinition: {
    info: {
      title: 'API Server',
      version: '0.0.1',
      description: 'ESS Status API Server',
    },
  },
  apis: ['app.js', './controller/*.js', './router/*.js'], // 設定為你的應用程式檔案
}

const specs = swaggerJsdoc(options)
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(specs))

app.use('/', router)

// // 路由處理
// import Ess from "@/postgresqlDB/model/essModel.js";
//
// import jwt from 'jsonwebtoken';
// app.get('/tmp', async (req, res) => {
//     try {
//
//         const payload = {
//             user_id:1,
//             username: "ETICABATTERY",
//             place_id:1,
//             place:"彰濱海岸"
//         }
//         const tokels
//         n = jwt.sign(payload, process.env.SECRET_KEY)
//
//         res.json(token);
//     } catch (error) {
//
//         res.status(500).send(error.message);
//     }
// });

export default app
