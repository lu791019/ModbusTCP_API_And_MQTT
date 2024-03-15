import Http from '@/utility/api/http.js'
import weatherInfoPostgreModel from '@/postgresqlDB/model/weatherInfoPostgreModel.js'
import csvParser from 'csv-parser' // 确保已经安装了csv-parser包
import { Readable } from 'stream' // 导入Node.js的Readable流
import weatherRiskInfo from '@/postgresqlDB/model/weatherRiskInfoPostgreModel.js'
import logger from '@/utility/logger/logger.js'

export default {
  // 中央氣象局的抓取資料
  cwbDataGetWeather: async (req, res) => {
    const http = new Http()
    const queryData = {
      Authorization: process.env.CWB_KEY,
      format: 'JSON',
      StationId: 'CAG070',
    }
    const data = await http.get(`${process.env.CWB_URL}/O-A0003-001`, queryData)

    // 讀取weatherInfoPostgreModel 根據 ObservationTime 給出最新的時間
    const latestTime = await weatherInfoPostgreModel.max('ObservationTime')
    // 如果latestTime 為null 代表資料庫沒有資料
    // 如果latestTime < station.ObsTime.DateTime 就往下跑反之就return
    if (latestTime && new Date(latestTime) >= new Date(data.records.Station[0].ObsTime.DateTime)) {
      console.log('資料庫已經是最新的了')
      return
    }

    let weatherData

    try {
      weatherData = data.records.Station.map((station) => ({
        StationName: station.StationName,
        StationId: station.StationId,
        ObservationTime: station.ObsTime.DateTime,
        StationLatitude: station.GeoInfo.Coordinates.find((coord) => coord.CoordinateName === 'WGS84').StationLatitude,
        StationLongitude: station.GeoInfo.Coordinates.find((coord) => coord.CoordinateName === 'WGS84')
          .StationLongitude,
        Weather: station.WeatherElement.Weather,
        VisibilityDescription: station.WeatherElement.VisibilityDescription,
        SunshineDuration: station.WeatherElement.SunshineDuration,
        WindDirection: station.WeatherElement.WindDirection,
        WindSpeed: station.WeatherElement.WindSpeed,
        AirTemperature: station.WeatherElement.AirTemperature,
        RelativeHumidity: station.WeatherElement.RelativeHumidity,
        AirPressure: station.WeatherElement.AirPressure,
      }))
    } catch (e) {
      logger.error('錯誤解析中央氣象局資訊', e)
      console.log(e)
      return
    }
    //     整理資料

    try {
      // Insert mapped data into the database using the WeatherInfo model
      // This example uses bulkCreate for inserting multiple records. Adjust as needed.
      await weatherInfoPostgreModel.bulkCreate(weatherData)
      console.log('Weather data inserted successfully.')
    } catch (error) {
      logger.error('錯誤存入中央氣象局資訊', error)
      console.error('Error inserting weather data:', error)
    }
  },
  // 天氣風險api 抓取資料
  weatherriskDataGetWeather: async (req, res) => {
    const http = new Http()
    let option = {
      'x-api-key': 'wistron',
      Accept: 'text/csv', // 确保API可以返回CSV格式的响应
    }
    console.log('gogog')

    try {
      // 注意：这里假设API响应的内容是CSV字符串
      const csvData = await http.get(`${process.env.WEATHERRISK_URL}/data`, {}, option)

      if (!csvData) {
        return res.status(500).send('Failed to fetch weather data.')
      }

      // 将CSV字符串转换为stream
      const csvStream = Readable.from(csvData)
      const parser = csvParser({
        headers: [
          'times',
          'pcpn',
          'pres',
          'rh',
          'temp',
          'cloud',
          'gust',
          'wind_speed',
          'wind_dir',
          'wind_speed_40m',
          'wind_dir_40m',
          'wind_speed_80m',
          'wind_dir_80m',
          'wind_speed_100m',
          'wind_dir_100m',
          'wind_speed_200m',
          'wind_dir_200m',
          'wind_speed_250m',
          'wind_dir_250m',
          'wind_speed_300m',
          'wind_dir_300m',
        ],
        skipLines: 1, // 如果API响应包含标题行，则跳过
      })

      csvStream
        .pipe(parser)
        .on('data', async (data) => {
          try {
            await weatherRiskInfo.upsert(data, { where: { times: data.times } })
          } catch (error) {
            console.error('Error storing data:', error)
          }
        })
        .on('end', () => {
          logger.info('完成抓取天氣風險預報資訊資料')
          console.log(`Successfully processed  rows of weather data.`)
        })
        .on('error', (error) => {
          logger.error('Error processing CSV:', error)
          console.error('Error processing CSV:', error)
        })
    } catch (error) {
      logger.error('HTTP GET request failed:', error)
      console.error('HTTP GET request failed:', error)
    }
  },
}
