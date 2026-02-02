import { env } from 'bun'

const LOG_LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 } as const
type LogLevel = keyof typeof LOG_LEVELS

export const logger = {
    log(level: LogLevel, message: string, data?: object) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            ...data
        }

        if (env.NODE_ENV === 'production') {
            console.log(JSON.stringify(logEntry))
        } else {
            const color =
                level === 'ERROR'
                    ? '\x1b[31m'
                    : level === 'WARN'
                      ? '\x1b[33m'
                      : '\x1b[32m'
            const reset = '\x1b[0m'
            console.log(
                `${color}[${level}]${reset} ${message}`,
                data ? data : ''
            )
        }
    },

    info: (msg: string, data?: object) => logger.log('INFO', msg, data),
    warn: (msg: string, data?: object) => logger.log('WARN', msg, data),
    error: (msg: string, data?: object) => logger.log('ERROR', msg, data),
    debug: (msg: string, data?: object) => logger.log('DEBUG', msg, data)
}
