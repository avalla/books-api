# Logger module

Log infrastructure, used in backend software

## How to use

Import module and use it for logging.

```javascript
const logger = require('@books-api/module-logger');

logger.log('info', 'Hello %s', 'world');
logger.error('Sorry, there was an error');
```

See [winston documentation](https://github.com/winstonjs/winston) for further help.
