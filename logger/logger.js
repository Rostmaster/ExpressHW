import {createLogger, format, transports} from 'winston'
const {combine, timestamp, label, prettyPrint} = format;

export default createLogger({
    level: 'debug',
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ]
});
