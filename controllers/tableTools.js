const knex = require('knex')
const logger = require('../logger/logger.js');
const config = require('config')
const studentsController = require("../controllers/students.js")
const gradesController = require("../controllers/grades.js")
const controllers = [studentsController, gradesController]

module.exports = {

    getTables: async (req, res) => {
        try {
            logger.info(`Table tools opened`)
            res.status(200)
                .render('tableTools', { title: 'Table tools' });
        } catch (error) {
            logger.error(`${req.method} to ${req.url} |: ${error.message}`)
            res.status(400).json({ status: "already exists" })
        }
    },

    createTable: async (req, res) => {
        let tableName = req.body.tableName;
        for (const controller of controllers) {
            if (controller.id === tableName)
                try {
                    controller.createTable(req, res);
                }
                catch (error) {
                    logger.error(`${req.method} to ${req.url} |: ${error.message}`);
                    res.status(400).json({ status: `creating table ${tableName} error` })
                }
        }
    },
    initTable: async (req, res) => {
        let tableName = req.body.tableName;
        for (const controller of controllers) {
            if (controller.id === tableName)
                try {
                    controller.initTable(req, res);
                }
                catch (error) {
                    logger.error(`${req.method} to ${req.url} |: ${error.message}`);
                    res.status(400).json({ status: `creating table ${tableName} error` })
                }
        }
    },
    deleteTable: async (req, res) => {
        let tableName = req.body.tableName;
        for (const controller of controllers) {
            if (controller.id === tableName)
                try {
                    controller.deleteTable(req, res);
                }
                catch (error) {
                    logger.error(`${req.method} to ${req.url} |: ${error.message}`);
                    res.status(400).json({ status: `creating table ${tableName} error` })
                }
        }
    },

}
