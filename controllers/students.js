const knex = require('knex')
const logger = require('../logger/logger.js');
const config = require('config')

const data_base = knex(config.database)


module.exports = {
    getStudents: async (req, res) => {
        try {
            const employees = await data_base.raw(`select * from company`)
            employees.rows = employees.rows.map(e => {
                e.address = e.address.trimEnd();
                return e;
            })
            res.status(200).json(employees.rows)
        }
        catch (error) {
            logger.error(error.message)
            res.status(404).json({ error: `employees not found` })
        }
    },
    getStudent: async (req, res) => {
        try {
            const id = req.params.studentId
            const employees = await data_base.raw(`select * from company where id = ${id}`)
            employees.rows = employees.rows.map(e => {
                e.address = e.address.trimEnd();
                return e;
            })
            res.status(200).json(employees.rows)
        }
        catch (error) {
            const id = req.params.id
            logger.error(error.message)
            res.status(404).json({ error: `employee '${id}' not found` })
        }
    },
    createStudent: async (req, res) => { },
    updateStudent: async (req, res) => { },
    deleteStudent: async (req, res) => { },
    createStudentsTable: async (req, res) => {
        try {
            await data_base.raw(
                `CREATE TABLE students (` +
                `id SERIAL PRIMARY KEY, ` +
                `name TEXT NOT NULL,` +
                `city CHAR(50),` +
                `birth_year INTEGER);`);

            res.status(201).json({ status: "table-created" })
        } catch (error) {
            logger.error(error.message)
            res.status(400).json({ status: "already exists" })
        }
    },
    initStudentsTable: async (req, res) => {
        try {
            logger.info(` initializing students table...`)

            await data_base.raw( `${data_base('students').insert({ name: 'Johnathan', city: 'Ohio', birth_year: 1990 })}`)
            res.status(201).json({ result: 'success' })
        }
        catch (error) {
            logger.error(error.message)
            res.status(400).json({ status: "already exists" })
        }
    }
}
