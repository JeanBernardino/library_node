import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import errosManipulator from './middlewares/errorsManipulator.js';
import notFoundManipulator from './middlewares/notFoundManipulator.js';

db.on('error', console.log.bind(console, 'connection error'));
db.once('open', () => console.log('connection open...'));

const app = express();
app.use(express.json());
routes(app);

app.use(notFoundManipulator);
app.use(errosManipulator);

export default app;