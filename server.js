import app from '@/app.js'
import sequelize from '@/postgresqlDB/databases.js' // 確保從正確的路徑導入您的 Sequelize 實例
import MqttFlowController from '@/controller/MqttFlowController.js'
import SkysailsController from '@/controller/SkysailsController.js'
import LidarController from '@/controller/LidarController.js'
import logger from '@/utility/logger/logger.js'
import WeatherController from '@/controller/WeatherController.js'
import LightningController from '@/controller/LightningController.js'

import cron from 'node-cron'
import dotenv from 'dotenv'

dotenv.config()

const port = 3000

// 啟動 MqttFlow 服務
if (process.env.NODE_ENV == 'prd') {
  // 啟動 MqttFlow
  const mqtt = new MqttFlowController()
  mqtt.start()
}

// 啟動排成
// 刪除每日資訊使用
cron.schedule('0 12 * * *', async () => {
  //     刪除資訊
  if (process.env.NODE_ENV == 'prd') {
    logger.info('刪除資訊')
    await SkysailsController.deleteSkysails()
    logger.info('完成刪除資訊')
  }
})

// Lidar 風速實測資訊 每15秒就會有資訊 但是跑一次需要時間約1分鐘 所以設定每5分鐘跑一次
cron.schedule('*/5 * * * *', async () => {
  if (process.env.NODE_ENV == 'prd') {
    try{
      console.log('清除相關文件')
      await LidarController.deleteFile()
      console.log('開始執行 FTP 下載任務')
      await LidarController.ftpDownload()
      console.log('進行檔案轉擋')
      await LidarController.converToCsv()
      console.log('檔案轉擋完成')
      console.log('開始上傳資料庫')
      await LidarController.saveToDB()
      console.log('上傳資料庫完成')
    }catch (error) {
        console.log('Lidar 風速實測資訊 發生錯誤')
        console.log(error)
    }

  }
})

// 天氣風險的資訊更新 固定於06,18點更新，06點資料範圍為包含當日共189小時之預報，18點資料範圍為包含隔日共177小時之預報
cron.schedule('10 * * * *', async () => {
  // cron.schedule('* * * * *', async () => {
  console.log('開始抓取天氣風險資料')
  await WeatherController.weatherriskDataGetWeather()
})

// 中央氣象局氣象站 每10分鐘會更新一次
cron.schedule('*/10 * * * *', async () => {
  console.log('開始抓取氣象局資料')
  await WeatherController.cwbDataGetWeather()
})

// 天氣風險雷擊 現在調整每30分鐘更新一次 後續需要調整更新
cron.schedule('*/30 * * * *', async () => {
  console.log('開始抓取lighting資料')
  await LightningController.currentLightning()
})

// 在应用程序启动时同步数据库
sequelize.sync().then(() => {
  console.log('Database synchronized')
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
})
