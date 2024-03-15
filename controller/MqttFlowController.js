// MqttFlow.js

import mqtt from 'mqtt'
import { Point } from '@influxdata/influxdb-client'
import SkysailsInfluxModel from '@/influxDB/model/SkysailsInfluxModel.js'
import skysailsPostgreModel from '@/postgresqlDB/model/skysailsPostgreModel.js'
import logger from '@/utility/logger/logger.js'

class MqttFlowController {
  constructor() {
    // 初始化你的 MQTT 和 InfluxDB 相關設定
    this.mqttUrl = `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`
    this.mqttClient = mqtt.connect(this.mqttUrl, {
      username: `${process.env.MQTT_USERNAME}`,
      password: `${process.env.MQTT_PASSWORD}`,
    })

    this.skysailsInfluxDB = new SkysailsInfluxModel()
  }

  start() {
    // 啟動 MQTT 客戶端
    this.mqttClient.on('connect', () => {
      this.mqttClient.subscribe('PN14-0009902/#')
    })

    // 接收資訊
    this.mqttClient.on('message', async (topic, message) => {
      // 處理數據並寫入 InfluxDB
      const value = parseFloat(message.toString())

      // 使用 split 方法分割字符串
      const parts = topic.split('/')
      // 获取数组的最后一个元素
      const tag = parts[parts.length - 1]

      // 其實件註記來源的標籤
      const point = new Point(this.skysailsInfluxDB.measurement).tag('topic', tag).floatField('value', value)

      await this.skysailsInfluxDB.writePoints(point)

      //  將資訊寫入 PostgreSQL
      await skysailsPostgreModel.create({
        name: tag,
        value: value,
      })
    })

    this.mqttClient.on('close', () => {
      this.skysailsInfluxDB
        .close()
        .then(() => {
          console.log('WriteApi closed')
        })
        .catch((e) => {
          logger.error('Error closing WriteApi')
          logger.error(e)
        })
    })

    // 啟動 MQTT 客戶端的錯誤處理
    this.mqttClient.on('error', (err) => {
      console.log('Error: ' + err)
      this.mqttClient.end()
    })
  }
}

export default MqttFlowController
