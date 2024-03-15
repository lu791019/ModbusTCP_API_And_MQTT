import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const customFormat = format.combine(
  format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
  format.align(),
  format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`),
)

const defaultOptions = {
  format: customFormat,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
}

const logger = createLogger({
  transports: [
    new DailyRotateFile({
      filename: 'public/logs/info.log',
      level: 'info',
      format: format.combine(
        format.printf((info) => (info.level === 'info' ? `${info.level}: ${info.timestamp} ${info.message}` : '')),
      ),
      ...defaultOptions,
    }),
    new DailyRotateFile({
      filename: 'public/logs/error.log',
      level: 'error',
      ...defaultOptions,
    }),
  ],
})

export default logger
