import express from 'express'
import router from '@/router/router.js';
import MqttFlowController from "./controller/MqttFlowController.js";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


import dotenv from 'dotenv';
dotenv.config();




const app = express();
const port = 3000;

app.use(express.json());

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
};

const specs = swaggerJsdoc(options);
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(specs));




// 啟動 MqttFlow
const mqtt=new MqttFlowController()
mqtt.start();






app.use('/', router)



// 啟動伺服器
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});