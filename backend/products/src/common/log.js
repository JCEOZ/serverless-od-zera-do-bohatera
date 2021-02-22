const LogLevels = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

const logLevelName = process.env.logLevel || 'DEBUG'

const debug = (msg, params) => log('DEBUG', msg, params);
const info = (msg, params) => log('INFO', msg, params);
const warn = (msg, params, error) => log('WARN', msg, appendError(params, error));
const error = (msg, params, error) => log('ERROR', msg, appendError(params, error));

const log = (levelName, message, params) => {
  if (shouldNotLog(levelName)) {
    return;
  }

  const logMsg = {
    message,
    level: levelName,
    ...params
  }

  // eslint-disable-next-line prefer-template
  console.log(message, JSON.stringify(logMsg) + ' \n');
}

const shouldNotLog = (level) => LogLevels[level] < LogLevels[logLevelName]

const appendError = (params, err) => {
  if (!err) {
    return params;
  }

  return Object.assign(
    params || {},
    { errorName: err.name, errorMessage: err.message, stackTrace: err.stack }
  );
}

module.exports = {
  debug,
  info,
  warn,
  error
}
