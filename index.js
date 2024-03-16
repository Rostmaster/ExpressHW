const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('config')
const app = express();

const logger = require('./logger/logger.js');
const studentsRouter = require('./routers/students.js')

const port = config.server.port;

app.use(cors());
app.use(bodyParser.json());
app.use(studentsRouter);
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join('.', '/static/'))) 

app.get("/", (req, res) => {
    res.render("homepage");
});

app.listen(port, () => {
    console.clear();
    logger.info(`Server started on port ${port}`)
})
