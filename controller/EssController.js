import { processJson,flattenObject } from '@/utility/processJson.js'
import EssInfluxModel from '@/influxDB/model/EssInfluxModel.js';


export default {
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

    postEssStatus: async (req, res) => {
        try {
            const essStatusData = req.body;

            if (!essStatusData) {
                return res.status(400).json({ error: 'Invalid JSON data' });
            }

            // 將資料寫入到 InfluxDB
            const essInfluxModel = new EssInfluxModel();
            let tmp=await essInfluxModel.save({"productName":essStatusData.productName},flattenObject(essStatusData));
            console.log("tmp")
            console.log(tmp)
            essInfluxModel.close()



            const result = processJson(essStatusData);
            // console.log('Result:', result);
            const formattedDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); // YYYY-MM-DD HH:mm:ss

            const { productName, eticaBMS: { soc, totalVoltage, totalCurrent } } = result;

            console.log(`Recieve ESS data: { Name: ${productName}, SOC: ${soc}, totalVoltage: ${totalVoltage}, totalCurrent: ${totalCurrent}  }   ${formattedDate}`);

            res.json(result);
        } catch (error) {
            console.error('Exception ERROR =>', error);
            res.status(400).json({ error: error.toString() });
        }
    }


}