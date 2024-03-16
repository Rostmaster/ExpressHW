const knex = require('knex')
const logger = require('../logger/logger.js');
const config = require('config')

const data_base = knex(config.database)


module.exports = {

    getStudents: async (req, res) => {
        try {
            const students = await data_base.raw(`select * from students`)
            students.rows = students.rows.map(e => {
                e.city = e.city.trimEnd();
                return e;
            })
            res.status(200).render('students', { title: 'Students:', students: students.rows })
        }
        catch (error) {
            logger.error(error.message)
            res.status(404).json({ error: `students not found` })
        }
    },
    getStudent: async (req, res) => {
        try {
            const id = req.params.studentId
            const student = await data_base.raw(`select * from students where id = ${id}`)
            if (student.rows.length === 0) throw new Error(`student '${id}' not found`)

            student.rows = student.rows.map(e => {
                e.city = e.city.trimEnd();
                return e;
            })
            logger.info(`student '${JSON.stringify(student.rows)}' found`)
            res.status(200)
            .render('student', { title: 'Result:', student:student.rows[0] });
        }
        catch (error) {
            const id = req.params.studentId
            logger.error(error.message)
            res.status(404)
            .render('404', { title: 'Not found', message: `Seems like student ${id} not found` });
        }
    },
    createStudent: async (req, res) => {
        try {
            const { name, city, birth_year } = req.body
            await data_base.raw(`${data_base('students').insert({ name, city, birth_year })}`)
            logger.info(`student '${JSON.stringify(req.body)}' created`)
            res.status(201).json({ status: "new student created" })
        }
        catch (error) {
            logger.error(`${req.method} to ${req.url} |: ${error.message}`)
            res.status(400).json({ error: req.body })
        }
    },
    updateStudent: async (req, res) => {
        try {
            const id = req.params.studentId
            let student = await data_base.raw(`select * from students where id = ${id}`)
            student.rows = student.rows.map(e => {
                e.city = e.city.trimEnd();
                return e;
            })
            if (req.method === "PUT") {
                const { name, city, birth_year } = req.body
                await data_base.raw(`${data_base('students').where('id', id).update({ name, city, birth_year })}`)
                logger.info(`student ${JSON.stringify(student.rows)} updated to '${JSON.stringify(req.body)}'`)
                res.status(200).json({ status: `student ${id} updated` })
            }
            if (req.method === "PATCH") {
                for (const key in req.body) {
                    await data_base('students').where('id', id).update({ [key]: req.body[key] })
                }
                logger.info(`student ${JSON.stringify(student.rows)} updated to '${JSON.stringify(req.body)}'`)
                res.status(200).json({ status: `Student ${id} updated` })
            }
        }
        catch (error) {
            const id = req.params.studentId
            logger.error(`${req.method} to ${req.url} |: ${error.message}`)
            res.status(404).json({ error: `student '${id}' not updated` })
        }
    },
    deleteStudent: async (req, res) => {
        try {
            const id = req.params.studentId
            let student = await data_base.raw(`select * from students where id = ${id}`)
            await data_base.raw(`delete from students where id = ${id}`)
            student.rows = student.rows.map(e => {
                e.city = e.city.trimEnd();
                return e;
            })
            logger.info(`student '${JSON.stringify(student.rows)}' deleted`)
            res.status(200).json({ status: `Student ${id} deleted` })
        }
        catch (error) {
            const id = req.params.id
            logger.error(`${req.method} to ${req.url} |: ${error.message}`)
            res.status(400).json({ error: `student '${id}' not deleted` })
        }
    },
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
            logger.error(`${req.method} to ${req.url} |: ${error.message}`)
            res.status(400).json({ status: "already exists" })
        }
    },
    initStudentsTable: async (req, res) => {
        try {
            logger.info(` initializing students table...`)
            await data_base.raw(`${data_base('students').insert({ name: 'Johnathan', city: 'Ohio', birth_year: 1990 })}`)
            await data_base.raw(`${data_base('students').insert({ name: 'Glibly', city: 'Manchester', birth_year: 1991 })}`)
            await data_base.raw(`${data_base('students').insert({ name: 'Rachel', city: 'Las Vegas', birth_year: 1988 })}`)
            await data_base.raw(`${data_base('students').insert({ name: 'Zola', city: 'Talas', birth_year: 1899 })}`)
            await data_base.raw(`${data_base('students').insert({ name: 'Khan', city: 'Liverpool', birth_year: 1965 })}`)
            await data_base.raw(`${data_base('students').insert({ name: 'Abraham', city: 'Texas', birth_year: 1970 })}`)
            logger.info(`Students table initialized successfully`)
            res.status(201).json({ result: 'Students table initialized successfully' })
        }
        catch (error) {
            logger.error(`${req.method} to ${req.url} |: ${error.message}`)
            res.status(400).json({ status: "Students table was not initialized" })
        }
    },
    deleteStudentsTable: async (req, res) => {
        try {
            logger.info(` deleting students table...`)
            await data_base.raw(`DROP TABLE IF EXISTS students;`)
            logger.info(`Students table deleted successfully`)
            res.status(200).json({ result: 'Students table deleted successfully' })
        }
        catch (error) {
            logger.error(`${req.method} to ${req.url} |: ${error.message}`)
            res.status(500).json({ status: "Students table was not deleted" })
        }
    }
}
