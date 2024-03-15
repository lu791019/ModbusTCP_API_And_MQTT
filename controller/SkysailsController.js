import skysailsPostgreModel from '@/postgresqlDB/model/skysailsPostgreModel.js'
import { Op } from 'sequelize'
import logger from '@/utility/logger/logger.js'

export default {
  deleteSkysails: async (req, res) => {
    //     根據updatedAt 刪除1星期前的資料
    const date = new Date()
    date.setDate(date.getDate() - 7)
    await skysailsPostgreModel.destroy({
      where: {
        updatedAt: {
          [Op.lte]: date,
        },
      },
    })
    // 查詢skysails表的id最大值
    const [result, metadata] = await skysailsPostgreModel.sequelize.query('SELECT MAX(id) FROM skysails')

    // result是一個陣列，其中包含查詢結果。查詢結果本身也是一個陣列，第一個元素是實際的查詢結果對象
    const maxId = result[0].max // 假設查詢結果的結構是[{ max: 最大值 }]

    //         尋找id 是否有1 的存在
    const [result1, metadata1] = await skysailsPostgreModel.sequelize.query('SELECT id FROM skysails WHERE id = 1')
    const id1 = result1[0]?.id // 假設查詢結果的結構是[{ id: 1 }]
    // 如果id1不存在，則新增一筆id為1的資料

    // 檢查id的最大值是否大於1000000
    if (maxId > 20000000 && id1 === null) {
      logger.info('重置key值')
      // 如果是，則重置skysails_id_seq的起始值為1
      await skysailsPostgreModel.sequelize.query('ALTER SEQUENCE skysails_id_seq RESTART WITH 1')
    }
  },
}
