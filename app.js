const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { round } = require('lodash');

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
    apis: ['app.js'], // 設定為你的應用程式檔案
};

const specs = swaggerJsdoc(options);
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(specs));

function processJson(data) {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'object') {
            result[key] = processJson(value);
        } else {
            result[key] = typeof value === 'number' ? round(value * 1, 1) : value;
        }
    }
    return result;
}


app.get('/', (req, res) => {
    res.send('Hello World!');
})

/**
 * @swagger
 * tags:
 *   - name: ESS Status API Documentation
 *     description: Operations related to ESS Data
 */


/**
 * @swagger
 * definitions:
 *   Esstatus:
 *     type: object
 *     properties:
 *       productName:
 *         type: string *
 *       eticaBMS:
 *         type: object
 *       danfossPCS:
 *         type: object
 *       dieselGenerator:
 *         type: object
 *         description: ESS status
 */





/**
 * @swagger
 * /ess_cal/ess_status:
 *   post:
 *     tags:
 *       - ESS Status
 *     summary: Post ESS status
 *     produces:
 *       - application/json
 *     parameters:  # 将 requestBody 改为 parameters
 *       - name: esstatus  # 参数名称
 *         in: body         # 参数位置（可以是 path, query, body, header 或 form）
 *         description: ESS Status JSON
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Esstatus'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Esstatus'
 *       400:
 *         description: Bad request
 */





app.post('/ess/ess_cal/ess_status', (req, res) => {
    try {
        const essStatusData = req.body;

        if (!essStatusData) {
            return res.status(400).json({ error: 'Invalid JSON data' });
        }

        const result = {
            productName: essStatusData.productName,
            eticaBMS: processJson(essStatusData.eticaBMS),
            danfossPCS: processJson(essStatusData.danfossPCS),
            dieselGenerator: processJson(essStatusData.dieselGenerator),
        };

        res.json(result);
    } catch (error) {
        console.error('Exception ERROR =>', error);
        res.status(400).json({ error: error.toString() });
    }
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});