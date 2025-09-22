import pino from 'pino';
import fs from 'fs';
import { Constants } from './Constants';

const isCI = Constants.LOG_FILE;

export const logger = isCI
    ? pino(
        {
            // Override timestamp for readable format
            timestamp: () => `time="${new Date().toISOString()}"`
        },
        fs.createWriteStream(Constants.LOG_PATH, { flags: 'a' })
    )
    : pino({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'yyyy-MM-dd HH:mm:ss', // Pretty console timestamp
                ignore: 'pid,hostname',
                levelFirst: true,
            },
        },
        level: process.env.LOG_LEVEL || 'info',
    });
