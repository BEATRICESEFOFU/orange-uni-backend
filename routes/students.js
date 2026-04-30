const express = require('express')
const protect = require('../middleware/auth')
const db = require('../db/database')

const router = express.Router()

// GET /api/students - get all students
router.get('/', protect, (req, res) => {
    try {
        const students = db
            .prepare('SELECT * FROM students ORDER BY id DESC')
            .all()
        res.json(students)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET /api/students/:id - get one student
router.get('/:id', protect, (req, res) => {
    const student = db
        .prepare('SELECT * FROM students WHERE id = ?')
        .get(req.params.id)

    if (!student) {
        return res.status(404).json({ error: 'Student not found.' })
    }

    res.json(student)
})

// POST /api/students - create a student
router.post('/', protect, (req, res) => {
    const { id, name, email, dept, year, gpa, phone, status } = req.body

    if (!id || !name || !email || !dept || !year || gpa === undefined) {
        return res.status(400).json({
            error: 'id, name, email, dept, year and gpa are required.'
        })
    }

    const existing = db
        .prepare('SELECT id FROM students WHERE id = ?')
        .get(id)

    if (existing) {
        return res
            .status(409)
            .json({ error: 'A student with that ID already exists.' })
    }

    db.prepare(
        `INSERT INTO students 
        (id, name, email, dept, year, gpa, phone, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
        id,
        name,
        email,
        dept,
        year,
        parseFloat(gpa),
        phone || null,
        status || 'active'
    )

    const created = db
        .prepare('SELECT * FROM students WHERE id = ?')
        .get(id)

    res.status(201).json(created)
})

// PUT /api/students/:id - update a student
router.put('/:id', protect, (req, res) => {
    const student = db
        .prepare('SELECT * FROM students WHERE id = ?')
        .get(req.params.id)

    if (!student) {
        return res.status(404).json({ error: 'Student not found.' })
    }

    const { name, email, dept, year, gpa, phone, status } = req.body

    db.prepare(
        `UPDATE students
         SET name = ?, email = ?, dept = ?, year = ?, gpa = ?, phone = ?, status = ?
         WHERE id = ?`
    ).run(
        name || student.name,
        email || student.email,
        dept || student.dept,
        year || student.year,
        gpa !== undefined ? parseFloat(gpa) : student.gpa,
        phone !== undefined ? phone : student.phone,
        status || student.status,
        req.params.id
    )

    const updated = db
        .prepare('SELECT * FROM students WHERE id = ?')
        .get(req.params.id)

    res.json(updated)
})

// DELETE /api/students/:id - delete a student
router.delete('/:id', protect, (req, res) => {
    const student = db
        .prepare('SELECT * FROM students WHERE id = ?')
        .get(req.params.id)

    if (!student) {
        return res.status(404).json({ error: 'Student not found.' })
    }

    db.prepare('DELETE FROM students WHERE id = ?').run(req.params.id)

    res.json({
        message: `Student ${req.params.id} deleted successfully.`
    })
})

module.exports = router