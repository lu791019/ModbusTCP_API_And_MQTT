import Http from '@/utility/api/http.js'
import generatedKey from '@/utility/weather/authentication.js'
import LightningPostgreModel from '@/postgresqlDB/model/LightningPostgreModel.js'

// const axios = require('axios')
// const { processJson } = require('@/utility/processJson.js')
// const LightningPostgreModel = require('@/postgresqlDB/model/LightningPostgreModel.js')

export default {
  currentLightning: async () => {
    const http = new Http()
    const option = {
      lt: 'UWAS',
      lc: '7173',
      locdet: '1',
      latlon: '1',
      alerts: '1(client=2206,type=lightning)',
      format: 'json',
      u: '2206-10165',
      k: generatedKey(),
    }

    const data = await http.get(`${process.env.WEATHER_BASE_URL}`, option)

    // 使用lightingAPI获取当前闪电数据
    // const data = await lightingAPI.currentLightning();

    const latestTime = await LightningPostgreModel.max('issue_time')
    if (data.locations && data.locations.length > 0) {
      const location = data.locations[0] // 假設你想要操作第一個位置
      if (
        location.alerts &&
        location.alerts.issue_time &&
        latestTime &&
        new Date(latestTime) >= new Date(location.alerts.issue_time.DateTime)
      ) {
        // 進行相關操作
      }
    }
    let lightingData
    console.log('資料抓取完畢')

    // try {
    //     lightingData = data.countries[0].locations.map((locations) => ({
    //         latitude: locations.latitude,
    //         longitude: locations.longitude,
    //         alerts_id: locations.alerts[0].id,
    //         alert_type: locations.alerts[0].alert_type,
    //         status: locations.alerts[0].status,
    //         issue_time: locations.alerts[0].issue_time,
    //         issue_time_local: locations.alerts[0].issue_time_local,
    //         embargo_end: locations.alerts[0].embargo_end,
    //         embargo_end_local: locations.alerts[0].embargo_end_local,
    //         event_start: locations.alerts[0].event_start,
    //         event_end: locations.alerts[0].event_end,
    //     }))
    // } catch (e) {
    //     console.log(e)
    //     return
    // }
    // try {
    //     await LightningPostgreModel.bulkCreate(lightingData)
    //     console.log('lighting data inserted successfully.')
    // } catch (error) {
    //     console.error('Error inserting lighting data:', error)
    // }

    try {
      const lightingData = data.countries[0].locations.map((location) => ({
        latitude: location.latitude,
        longitude: location.longitude,
        alerts_id: location.alerts[0].id,
        alert_type: location.alerts[0].alert_type,
        status: location.alerts[0].status,
        issue_time: location.alerts[0].issue_time,
        issue_time_local: location.alerts[0].issue_time_local,
        embargo_end: location.alerts[0].embargo_end,
        embargo_end_local: location.alerts[0].embargo_end_local,
        event_start: location.alerts[0].event_start,
        event_end: location.alerts[0].event_end,
      }))

      for (const record of lightingData) {
        // 檢查是否存在相同的 alerts_id 和 issue_time 組合
        const exists = await LightningPostgreModel.findOne({
          where: {
            alerts_id: record.alerts_id,
            issue_time: record.issue_time,
          },
        })

        // 如果不存在，則插入
        if (!exists) {
          await LightningPostgreModel.create(record)
          console.log(`Record inserted: ${record.alerts_id}`)
        } else {
          console.log(`Record already exists: ${record.alerts_id}`)
        }
      }
      console.log('All data processed successfully.')
    } catch (error) {
      console.error('Error processing lighting data:', error)
    }
  },
}
