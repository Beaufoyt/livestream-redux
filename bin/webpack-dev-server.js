const devServer = require('../build/webpack-dev-server');
const config = require('../config');

const port = config.webpack_port;
devServer.listen(port, 'localhost', () => {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
