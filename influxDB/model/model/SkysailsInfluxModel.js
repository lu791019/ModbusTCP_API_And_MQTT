import Model from '@/influxDB/model/Model.js'

export default class SkysailsInfluxModel extends Model {
  //    複寫父類別的方法
  constructor() {
    super()
    this.measurement = 'skysails'
    this.influxDBSchema = {
      measurement: this.measurement,
      tags: ['productName'],
      fields: {
        // 'Power_Chopper1_kW':'float',// 斬波功率
        // 'McAppWindSpeedMast_m_s':'float',// 桅杆風速計風速
        // 'WsAirDensityGround_kg_m3':'float',// 空氣密度
        // 'WsAirPressureGround_hPa':'float',// 大氣壓力
        // 'WsAirTemperatureGround_degC':'float',// 溫度
        // 'WsAppWindSpeedGround_m_s':'float',// 地表風速
        // 'WsDewPointGround_degC':'float',// 露點
        // 'WsGlobalRadiation_W_m2':'float',// 全輻射
        // 'WsHumidityGround_percent':'float',// 濕度
        // 'McAppWindAngleMast_deg':'float',// 桅杆風速計風向
        // 'MsAppWindAngleGround_deg':'float',// 地表風向
      },
    }
  }
}
