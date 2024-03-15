import jwt from 'jsonwebtoken'

export default {
  /**
   * @swagger
   * /jwt:
   *   post:
   *     tags:
   *       - JWT
   *     summary: Post JWT info
   *     produces:
   *       - application/json
   *     parameters:  # 将 requestBody 改为 parameters
   *       - name: jwt  # 参数名称
   *         in: body         # 参数位置（可以是 path, query, body, header 或 form）
   *         description: jwt  JSON created
   *         required: true
   *     responses:
   *       200:
   *         description: success
   *         content:
   *           application/json:
   *            schema:
   *              type: string
   *       400:
   *         description: Bad request
   */

  postJWT: async (req, res) => {
    try {
      const body = req.body
      // const payload = {
      //     user_id:1,
      //     username: "ETICABATTERY",
      //     place_id:1,
      //     place:"彰濱海岸"
      // }
      const token = jwt.sign(body, process.env.SECRET_KEY)
      console.log(token)
      res.json(token)
    } catch (error) {
      res.status(500).send(error.message)
    }
  },
}
