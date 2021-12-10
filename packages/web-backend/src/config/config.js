const Joi = require('joi');
const logger = require('@books-api/module-logger');

const schema = Joi.object({
  NODE_ENV: Joi.string().allow('development', 'production', 'test', 'provision').default('development'),
  API_PORT: Joi.number().default(9000),
  NYTIMES_KEY: Joi.string().required(),
})
  .unknown()
  .required();

logger.debug('Environment: %O', process.env);

const { error, value } = schema.validate(process.env);
if (error) {
  logger.error('Config validation error', error.message);
  throw new Error(`Config validation error: ${error.message}`);
}

const configuration = {
  env: value.NODE_ENV,
  port: value.API_PORT,
  nyTimesKey: value.NYTIMES_KEY,
};

logger.info('Configuration: %O', configuration);
module.exports = configuration;
