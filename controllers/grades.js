const knex = require('knex')
const logger = require('../logger/logger.js');
const config = require('config')
const data_base = knex(config.database)

module.exports = {
    id: "grades",
    //?===========Students=============

    getGrades: async (req, res) => {
        try {
            const grades = await data_base.raw(`select * from grades order by id asc`)
            grades.rows = grades.rows.map(e => {
                e.subject = e.subject.trimEnd();
                return e;
            })
            res.status(200).render('grades', { title: 'Grades:', grades: grades.rows })
        }
        catch (error) {
            logger.error(error.message)
            res.status(404).json({ error: `grades not found` })
        }
    },
    getGrade: async (req, res) => {
        try {
            const id = req.params.gradeId
            const grade = await data_base.raw(`select * from grades where id = ${id}`)
            if (grade.rows.length === 0) throw new Error(`grade '${id}' not found`)

            grade.rows = grade.rows.map(e => {
                e.subject = e.subject.trimEnd();
                return e;
            })
            logger.info(`grade '${JSON.stringify(grade.rows)}' found`)
            res.status(200)
                .render('grade', { title: 'Result:', grade: grade.rows[0] });
        }
        catch (error) {
            const id = req.params.studentId
            logger.error(error.message)
            res.status(404)
                .render('404', { title: 'Not found', message: `Seems like grade ${id} not found` });
        }
    },
    createGrade: async (req, res) => {
        try {
            const { student_id, grade, subject } = req.body
            await data_base.raw(`${data_base('grades').insert({ student_id, grade, subject })}`)
            logger.info(`student '${JSON.stringify(req.body)}' created`)
            res.status(201).json({ status: "new student created" })
        }
        catch (error) {
            logger.error(`${req.method} to ${req.url} |: ${error.message}`)
            res.status(400).json({ error: req.body })
        }
    },
    updateGrade: async (req, res) => {
        try {
            const id = req.params.gradeId
            let Grade = await data_base.raw(`select * from grades where id = ${id}`)
            Grade.rows = Grade.rows.map(e => {
                e.subject = e.subject.trimEnd();
                return e;
            })
            if (req.method === "PUT") {
                const { student_id, subject, grade } = req.body
                await data_base.raw(`${data_base('grades').where('id', id).update({ student_id, subject, grade })}`)
                logger.info(`grade ${JSON.stringify(Grade.rows)} updated to '${JSON.stringify(req.body)}'`)
                res.status(200).json({ status: `grade ${id} updated` })
            }
            if (req.method === "PATCH") {
                for (const key in req.body) {
                    await data_base('grade').where('id', id).update({ [key]: req.body[key] })
                }
                logger.info(`grade ${JSON.stringify(Grade.rows)} updated to '${JSON.stringify(req.body)}'`)
                res.status(200).json({ status: `grade ${id} updated` })
            }
        }
        catch (error) {
            const id = req.params.gradeId
            logger.error(`${req.method} to ${req.url} |: ${error.message}`)
            res.status(404).json({ error: `grade '${id}' not updated` })
        }
    },
    deleteGrade: async (req, res) => {
        try {
            const id = req.params.gradeId
            let Grade = await data_base.raw(`select * from grades where id = ${id}`)
            Grade.rows = Grade.rows.map(e => {
                e.subject = e.subject.trimEnd();
                return e;
            })
            console.log(await data_base.raw(`delete from grades where id = ${id}`))

            logger.info(`grade '${JSON.stringify(Grade.rows)}' deleted`)
            res.status(200).json({ status: `grade ${id} deleted` })
        }
        catch (error) {
            const id = req.params.gradeId
            logger.error(`${req.method} to ${req.url} |: ${error.message}`)
            res.status(400).json({ error: `grade '${id}' not deleted` })
        }
    },

    //?==============Table=============
    createTable: async (req, res) => {
        let tableName = req.body.tableName;
        try {
            logger.info(` creating grades table...`)
            await data_base.raw(
                `CREATE TABLE ${tableName}(
                    id serial primary key ,
                    student_id INT not null,
                    grade INT not NULL,
                    subject VARCHAR(60) not null
                    );` );
            //! foreign key (student_id) references STUDENTS(ID) ON DELETE CASCADE,

            logger.info(`table grades created successfully`)
            res.status(201).json({ status: "table-created" })
        } catch (error) {
            logger.error(`${req.method} to ${req.url} |: ${error.message}`)
            res.status(400).json({ status: "already exists" })
        }
    },
    initTable: async (req, res) => {
        try {
            logger.info(` initializing grades table...`)
            await data_base.raw(`${data_base('grades').insert({ student_id: '1', grade: 95, subject: 'Maths' })}`)
            await data_base.raw(`${data_base('grades').insert({ student_id: '2', grade: 55, subject: 'Maths' })}`)
            await data_base.raw(`${data_base('grades').insert({ student_id: '3', grade: 65, subject: 'Maths' })}`)
            await data_base.raw(`${data_base('grades').insert({ student_id: '4', grade: 75, subject: 'Maths' })}`)
            await data_base.raw(`${data_base('grades').insert({ student_id: '5', grade: 99, subject: 'Maths' })}`)
            await data_base.raw(`${data_base('grades').insert({ student_id: '6', grade: 93, subject: 'Maths' })}`)

            logger.info(`grades table initialized successfully`)
            res.status(201).json({ result: 'grades table initialized successfully' })
        }
        catch (error) {
            logger.error(`${req.method} to ${req.url} |: ${error.message}`)
            res.status(400).json({ status: "grades table was not initialized" })
        }
    },
    deleteTable: async (req, res) => {
        let tableName = req.body.tableName;
        try {
            logger.info(` deleting students table...`)
            await data_base.raw(`DROP TABLE IF EXISTS ${tableName};`)
            logger.info(`Students table deleted successfully`)
            res.status(200).json({ result: 'Students table deleted successfully' })
        }
        catch (error) {
            logger.error(`${req.method} to ${req.url} |: ${error.message}`)
            res.status(500).json({ status: "Students table was not deleted" })
        }
    },

}
