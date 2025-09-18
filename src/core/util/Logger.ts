// src/utils/Logger.ts
import pino from 'pino';

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true, // for terminal output
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname', // cleaner output
        },
    },
    level: process.env.LOG_LEVEL || 'info', // can be 'debug', 'warn', 'error'
});

export default logger;
