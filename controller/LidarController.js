import PromiseFtp from 'promise-ftp'
import fs_promise from 'fs/promises'
import fs from 'fs'
import path from 'path'
// 使用ES6 import導入需要的函數
import { promisify } from 'util'
import { exec as execCallback } from 'child_process'
import csv from 'csv-parser' // 使用 ES6 導入語法
import LidarWindPostgreModel from '@/postgresqlDB/model/lidarWindPostgreModel.js'
import logger from '@/utility/logger/logger.js'

// 使用 process.cwd() 获取当前工作目录
const currentWorkingDirectory = process.cwd()

const getFileName = () => {
  // 计算文件名
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const fileName = `Wind_706@Y${year}_M${month}_D${day}.ZPH`
  console.log(fileName)
  return fileName
}

export default {
  deleteFile: async () => {
    const localFilePath = path.join(currentWorkingDirectory, 'public')
    try {
      const files = await fs_promise.readdir(localFilePath)
      for (const file of files) {
        if (file.endsWith('.csv') || file.endsWith('.ZPH')) {
          await fs_promise.unlink(path.join(localFilePath, file))
          console.log('File deleted successfully.')
        }
      }
    } catch (err) {
      logger.error('找不到刪除csv和ZPH的位置.', err)
      console.error('Error processing directory.', err)
    }
  },
  ftpDownload: async () => {
    let ftp = null
    try {
      const serverConfig = {
        host: process.env.FTP_HOST,
        port: process.env.FTP_PORT,
        user: process.env.FTP_USERNAME,
        password: '', // 假设密码为空字符串
      }
      ftp = new PromiseFtp()

      // 连接到 FTP 服务器
      const serverMessage = await ftp.connect(serverConfig)
      console.log('连接成功，服务器响应：', serverMessage)

      //拿取檔案名稱
      const fileName = getFileName()

      // 定义本地路径
      const localFilePath = path.join(currentWorkingDirectory, 'public', fileName)

      console.log(localFilePath)

      // 下载文件
      await ftp.get(fileName).then((stream) => {
        return new Promise((resolve, reject) => {
          stream.once('close', resolve)
          stream.once('error', reject)
          stream.pipe(fs.createWriteStream(localFilePath))
        })
      })

      console.log('文件下载成功:', fileName)
    } catch (error) {
      logger.error('下载文件失败:', error)
      console.error('下载文件失败:', error)
    } finally {
      console.log('end ftp connection')
      if (ftp) {
        await ftp.end()
      }
    }
  },
  converToCsv: async () => {
    //執行shell script
    // 將exec轉換為Promise版本
    const exec = promisify(execCallback)

    try {
      // 使用await等待shell腳本執行完畢
      const { stdout, stderr } = await exec('docker run -v /var/www/public:/app sony791210/wind-zph-csv')

      if (stderr) {
        console.error(`stderr: ${stderr}`)
        return
      }
      console.log(`stdout: ${stdout}`)
    } catch (error) {
      logger.error(`執行轉換檔案中出現錯誤: ${error.message}`)
      console.error(`執行中出現錯誤: ${error.message}`)
    }
  },
  saveToDB: async () => {
    try {
      // 這裡是將csv檔案存入資料庫的程式碼
      //   讀取csv檔案 檔名public/Wind_706@Y2021_M07_D01.csv
      const results = []
      //拿取檔案名稱
      const fileName = getFileName() + '.csv'

      // 定义本地路径
      const localFilePath = path.join(currentWorkingDirectory, 'public', fileName)
      console.log(localFilePath)
      // 檢查檔案是否存在

      if (!fs.existsSync(localFilePath)) {
        console.log('File does not exist:', localFilePath)
        return false // 檔案不存在，返回 false
      }

      // 拿取LidarWindPostgreModel 的在reference 的最大值
      const maxReference = await LidarWindPostgreModel.max('reference')
      // 如果沒有資料就設定為0
      const reference = maxReference ? maxReference : 0

      fs.createReadStream(localFilePath)
        .pipe(
          csv({
            skipLines: 1, // 直接跳過前兩行
          }),
        )
        .on('data', (data) => {
          if (parseInt(data['Reference'], 10) > reference) {
            results.push({
              reference: parseInt(data['Reference'], 10),
              timeAndDate: data['Time and Date'],
              timestamp: parseInt(data['Timestamp (s)'], 10),
              infoFlags: data['Info. Flags'],
              statusFlags: data['Status Flags'],
              batteryVoltage: parseFloat(data['Battery (V)']),
              generatorVoltage: parseFloat(data['Generator (V)']),
              upperTemp: parseFloat(data['Upper Temp. (C)']),
              lowerTemp: parseFloat(data['Lower Temp. (C)']),
              podHumidity: parseFloat(data['Pod Humidity (%)']),
              gps: data['GPS'],
              metCompassBearing: parseFloat(data['Met Compass Bearing (deg)']),
              metTilt: parseFloat(data['Met Tilt (deg)']),
              metAirTemp: parseFloat(data['Met Air Temp. (C)']),
              metPressure: parseFloat(data['Met Pressure (mbar)']),
              metHumidity: parseFloat(data['Met Humidity (%)']),
              metWindSpeed: parseFloat(data['Met Wind Speed (m/s)']),
              metWindDirection: parseFloat(data['Met Wind Direction (deg)']),
              raining: data['Raining'] === '1',
              fog: data['Fog'] === '1',
              windDirectionAt300m: parseFloat(data['Wind Direction (deg) at 300m']),
              horizontalWindSpeedAt300m: parseFloat(data['Horizontal Wind Speed (m/s) at 300m']),
              verticalWindSpeedAt300m: parseFloat(data['Vertical Wind Speed (m/s) at 300m']),
              windDirectionAt250m: parseFloat(data['Wind Direction (deg) at 250m']),
              horizontalWindSpeedAt250m: parseFloat(data['Horizontal Wind Speed (m/s) at 250m']),
              verticalWindSpeedAt250m: parseFloat(data['Vertical Wind Speed (m/s) at 250m']),
              windDirectionAt200m: parseFloat(data['Wind Direction (deg) at 200m']),
              horizontalWindSpeedAt200m: parseFloat(data['Horizontal Wind Speed (m/s) at 200m']),
              verticalWindSpeedAt200m: parseFloat(data['Vertical Wind Speed (m/s) at 200m']),
              windDirectionAt140m: parseFloat(data['Wind Direction (deg) at 140m']),
              horizontalWindSpeedAt140m: parseFloat(data['Horizontal Wind Speed (m/s) at 140m']),
              verticalWindSpeedAt140m: parseFloat(data['Vertical Wind Speed (m/s) at 140m']),
              windDirectionAt100m: parseFloat(data['Wind Direction (deg) at 100m']),
              horizontalWindSpeedAt100m: parseFloat(data['Horizontal Wind Speed (m/s) at 100m']),
              verticalWindSpeedAt100m: parseFloat(data['Vertical Wind Speed (m/s) at 100m']),
              windDirectionAt70m: parseFloat(data['Wind Direction (deg) at 70m']),
              horizontalWindSpeedAt70m: parseFloat(data['Horizontal Wind Speed (m/s) at 70m']),
              verticalWindSpeedAt70m: parseFloat(data['Vertical Wind Speed (m/s) at 70m']),
              windDirectionAt50m: parseFloat(data['Wind Direction (deg) at 50m']),
              horizontalWindSpeedAt50m: parseFloat(data['Horizontal Wind Speed (m/s) at 50m']),
              verticalWindSpeedAt50m: parseFloat(data['Vertical Wind Speed (m/s) at 50m']),
              windDirectionAt38m: parseFloat(data['Wind Direction (deg) at 38m']),
              horizontalWindSpeedAt38m: parseFloat(data['Horizontal Wind Speed (m/s) at 38m']),
              verticalWindSpeedAt38m: parseFloat(data['Vertical Wind Speed (m/s) at 38m']),
              windDirectionAt30m: parseFloat(data['Wind Direction (deg) at 30m']),
              horizontalWindSpeedAt30m: parseFloat(data['Horizontal Wind Speed (m/s) at 30m']),
              verticalWindSpeedAt30m: parseFloat(data['Vertical Wind Speed (m/s) at 30m']),
              windDirectionAt20m: parseFloat(data['Wind Direction (deg) at 20m']),
              horizontalWindSpeedAt20m: parseFloat(data['Horizontal Wind Speed (m/s) at 20m']),
              verticalWindSpeedAt20m: parseFloat(data['Vertical Wind Speed (m/s) at 20m']),
              windDirectionAt10m: parseFloat(data['Wind Direction (deg) at 10m']),
              horizontalWindSpeedAt10m: parseFloat(data['Horizontal Wind Speed (m/s) at 10m']),
              verticalWindSpeedAt10m: parseFloat(data['Vertical Wind Speed (m/s) at 10m']),
            })
          }
        })
        .on('end', async () => {
          // 假设 results 是一个包含了所有要插入数据的数组

          try {
            await LidarWindPostgreModel.bulkCreate(results)
            console.log('All data has been inserted successfully.')
          } catch (error) {
            console.error('Error inserting data into database:', error)
          }
        })
    } catch (e) {
      logger.error(e)
    }
  },
}
