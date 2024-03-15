import { InfluxDB, Point } from '@influxdata/influxdb-client'
import logger from '@/utility/logger/logger.js'

/**
 * @typedef {Object} DataPoint
 * @property {string} measurement
 * @property {Object.<string, string>} tags
 * @property {Object.<string, any>} fields
 */

let instance = null

export default class Model {
  constructor() {
    if (instance) {
      return instance
    }

    const URL = `http://${process.env.INFLUXDB_HOST}:${process.env.INFLUXDB_PORT}`
    const TOKEN = process.env.INFLUXDB_TOKEN
    const ORG = process.env.INFLUXDB_ORG
    const BUCKET = process.env.INFLUXDB_BUCKET

    // Reinitialize or update the InfluxDB instance if necessary
    this.influxDB = new InfluxDB({
      url: URL,
      token: TOKEN,
    })
    const writeOptions = {
      batchSize: 100, // 较小的批量大小
      flushInterval: 5000, // 较短的刷新间隔（毫秒）
    }

    this.writeApi = this.influxDB.getWriteApi(ORG, BUCKET, 'ns', writeOptions)
    // this.writeApi = this.influxDB.getWriteApi(ORG, BUCKET, 'ns');
    this.measurement = ''
    this.influxDBSchema = {
      measurement: '',
      tags: [],
      fields: {},
    }
    instance = this
  }

  setField(point, key, value) {
    const fieldType = this.influxDBSchema.fields[key]
    switch (fieldType) {
      case 'integer':
        point.intField(key, value)
        break
      case 'float':
        point.floatField(key, value)
        break
      case 'boolean':
        point.booleanField(key, value)
        break
      case 'string':
        point.stringField(key, value)
        break
      // ... 處理其他類型
      default:
        console.error(`未知的字段類型: ${fieldType} for field ${key}`)
        break
    }
  }

  async save(tag, data) {
    // 從 data 中提取 productName 並將其設為 tag

    const point = new Point(this.measurement)

    Object.entries(tag).forEach(([key, value]) => {
      point.tag(key, value)
    })

    Object.entries(data).forEach(([key, value]) => {
      if (key in this.influxDBSchema.fields) {
        this.setField(point, key, value)
      } else {
        console.warn(`未定義的字段: ${key}`)
      }
    })

    return await this.writePoints(point)
  }

  /**
   * @param {DataPoint} point
   */
  async writePoints(point) {
    try {
      await this.writeApi.writePoint(point)
    } catch (e) {
      logger.error(e)
    }
    return true
  }

  async close() {
    try {
      await this.writeApi.close()
      console.log('Flushed data and closed write API')
    } catch (e) {
      console.error('Error closing write API:', e)
    }
  }
}
