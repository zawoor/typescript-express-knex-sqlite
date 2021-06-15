process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';

if (!process.env.SESSION_SECRET) {
    console.error('Please prove a SESSION_SECRET in your .env file.');
    process.exit(1);
}

const app = new App([new IndexRoute()]);

app.listen();