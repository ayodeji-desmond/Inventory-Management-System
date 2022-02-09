import * as winston from 'winston';
import 'winston-daily-rotate-file';
import appRoot from 'app-root-path';

const levels = {
  error: 0,
  http: 1,
  warn: 2,
  info: 3,
  debug: 4,
}

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  http: 'magenta',
  info: 'green',
  debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.printf(
    
    (info) => `{${info.level}: ${info.message}}`

  ),
  winston.format.errors({stack: true})
)


let options = {
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD', 
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
}

const transports = [
  new winston.transports.Console({
    format: winston.format.simple(),
    level: 'debug'
  }),
  new winston.transports.DailyRotateFile(options),
]

export const logger = winston.createLogger({
  level: level(),
  format,
  transports
})

// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.DailyRotateFile({
//       dirname: `${appRoot}/logs/`,
//       level: 'info',
//       handleExceptions: true,
//       json: false,
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d'
//     })
//   ],
//   exitOnError: false
// });

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//       level: 'debug'
//     })
//   );
// }

// // logger.stream = {
// //   write(message:string) {
// //     logger.info(message);
// //   }
// // };

// export default logger;