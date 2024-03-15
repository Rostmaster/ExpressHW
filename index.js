import knex from 'knex';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import config from 'config'
const __dirname = import.meta.dirname;

import logger from './logger/logger.js';

const port  = config.server.port;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/static/')));

app.listen(port, () => {
    console.clear();
    logger.info(`Server started on port ${port}`)
})

const data_base = knex(config.database)