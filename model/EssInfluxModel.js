
import Model  from "@/influxDB/model/Model.js";
import { InfluxDB, Point } from '@influxdata/influxdb-client';

export default  class EssInfluxModel extends Model{
//    複寫父類別的方法
    constructor() {
        super();
        this.measurement = 'ess';
        this.influxDBSchema = {
            measurement: this.measurement,
            tags: ['productName'],
            fields: {
                'eticaBMS_heartBeat': 'integer',
                'eticaBMS_stringNumber': 'integer',
                'eticaBMS_circuitBreakerStatus': 'integer',
                'eticaBMS_totalVoltage': 'float',
                'eticaBMS_totalCurrent': 'float',
                'eticaBMS_soc': 'integer',
                'eticaBMS_soh': 'integer',
                'eticaBMS_maxBatteryVoltage': 'float',
                'eticaBMS_minBatteryVoltage': 'float',
                'eticaBMS_maxBatteryTemperature': 'integer',
                'eticaBMS_minBatteryTemprature': 'integer',
                'eticaBMS_rechargeableCapacity': 'float',
                'eticaBMS_dischargeableCapacity': 'float',
                'eticaBMS_allowableMaxDischargePower': 'integer',
                'eticaBMS_allowableMaxchargePower': 'integer',
                'eticaBMS_allowableMaxDischargeCurrent': 'float',
                'eticaBMS_allowableMaxchargeCurrent': 'float',
                'eticaBMS_operatingTemperature': 'integer',
                'eticaBMS_systemState': 'integer',
                'eticaBMS_chargeState': 'integer',
                'eticaBMS_systemInsulationR': 'integer',
                'eticaBMS_alarmList_alarmSummary': 'integer',
                'eticaBMS_alarmList_systemFaultSummary': 'integer',
                'eticaBMS_alarmList_graded_system_underVoltage': 'integer',
                'eticaBMS_alarmList_graded_system_overVoltage': 'integer',
                'eticaBMS_alarmList_graded_system_overCurrent': 'integer',
                'eticaBMS_alarmList_graded_system_lowInsulationR': 'integer',
                'eticaBMS_alarmList_graded_pack_underVoltage': 'integer',
                'eticaBMS_alarmList_graded_pack_overVoltage': 'integer',
                'eticaBMS_alarmList_graded_terminal_lowTemperature': 'integer',
                'eticaBMS_alarmList_graded_terminal_overTemperature': 'integer',
                'eticaBMS_alarmList_graded_module_lowTemperature': 'integer',
                'eticaBMS_alarmList_graded_module_overTemperature': 'integer',
                'eticaBMS_alarmList_graded_cell_underVoltage': 'integer',
                'eticaBMS_alarmList_graded_cell_overVoltage': 'integer',
                'eticaBMS_alarmList_graded_cell_diffVoltage': 'integer',
                'eticaBMS_alarmList_graded_cell_lowTemperature': 'integer',
                'eticaBMS_alarmList_graded_cell_overTemperature': 'integer',
                'eticaBMS_alarmList_graded_cell_diffTemperature': 'integer',
                'eticaBMS_alarmList_graded_cell_lowSOC': 'integer',
                'eticaBMS_alarmList_graded_cell_highSOC': 'integer',
                'eticaBMS_alarmList_graded_cell_lowSOH': 'integer',
                'eticaBMS_alarmList_graded_cell_highSOH': 'integer',
                'eticaBMS_alarmList_boolean_esbcmCommFailed': 'integer',
                'eticaBMS_alarmList_boolean_esbmmCommFailed': 'integer',
                'eticaBMS_alarmList_boolean_stringDiffVoltFailed': 'integer',
                'eticaBMS_alarmList_boolean_contactorDisconnectFailed': 'integer',
                'eticaBMS_alarmList_boolean_contactorClosingFailed': 'integer',
                'eticaBMS_alarmList_boolean_chargingProhibited': 'integer',
                'eticaBMS_alarmList_boolean_dischargingProhibited': 'integer',
                'eticaBMS_alarmList_boolean_getCellVoltageFailed': 'integer',
                'eticaBMS_alarmList_boolean_getCellTemperatureFailed': 'integer',
                'danfossPCS_energyCounter': 'integer',
                'danfossPCS_dclinkVoltage': 'integer',
                'danfossPCS_totalCurrent': 'integer',
                'danfossPCS_lineFrequency': 'integer',
                'danfossPCS_referenceFrequency': 'integer',
                'danfossPCS_oprationMode': 'integer',
                'danfossPCS_fbFixedStatusWord': 'integer',
                'danfossPCS_lastActiveWarning': 'integer',
                'danfossPCS_lastActiveFault': 'integer',
                'dieselGenerator_voltageL3toN': 'integer',
                'dieselGenerator_voltageL2toN': 'integer',
                'dieselGenerator_voltageL1toN': 'integer',
                'dieselGenerator_currentL3': 'integer',
                'dieselGenerator_currentL2': 'integer',
                'dieselGenerator_currentL1': 'integer',
                'dieselGenerator_pfL3': 'float',
                'dieselGenerator_pfL2': 'float',
                'dieselGenerator_pfL1': 'float',
                'dieselGenerator_frequency': 'float',
                'dieselGenerator_apparentPowerL3': 'integer',
                'dieselGenerator_apparentPowerL2': 'integer',
                'dieselGenerator_apparentPowerL1': 'integer',
                'dieselGenerator_activePowerL3': 'integer',
                'dieselGenerator_activePowerL2': 'integer',
                'dieselGenerator_activePowerL1': 'integer',
                'dieselGenerator_reactivePowerL3': 'integer',
                'dieselGenerator_reactivePowerL2': 'integer',
                'dieselGenerator_reactivePowerL1': 'integer',
                'dieselGenerator_speedRPM': 'integer',
                'dieselGenerator_oilPressure': 'integer',
                'dieselGenerator_coolantTemperature': 'integer',
                'dieselGenerator_batteryVoltage': 'float',
                'dieselGenerator_alarmCode': 'integer',
            }
        };


    }






}