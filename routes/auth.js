const express = require('express')
const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
const db      = require('../db/database')

const router = express.Router()

// POST /api/auth/register
router.post('/register', (req, res) => {
    const { username, email, password, role } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email and password are required.' })
    }
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
    if (existing) {
        return res.status(409).json({ error: 'A user with that email already exists.' })
    }

    const hashed = bcrypt.hashSync(password, 10)

    const result = db.prepare(
        'INSERT INTO users ( username, email, password, role)  VALUES (?, ?, ?, ?)'
    ).run(username, email, hashed, role || 'staff')

    const token = jwt.sign(
        { id: result.lastInsertRowid, username, role: role || 'staff'},
    process.env.JWT_SECRET,
    { expiresIn: '7d'}
    )

    res.status(201).json({
        message: 'User registered successfully.',
        token,
        user: { id: result.lastInsertRowid, username, email, role: role || 'staff' }
    })
})

// POST/api/auth/login
router.post('/login', (req, res) => {
    const {email, password } = req.body

    if (!email || !password) {
        return req.status(400).json({ error: 'Email and password are required.' })
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const match = bcrypt.compareSync(password, user.password)
    if (!match) {
        return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    res.json({
        message: 'Login successful.',
        token,
        user: { id: user.id, username: user.username, email: user.email, role: user.role }
    })
})

module.exports = router