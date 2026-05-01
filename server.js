require('dotenv').config()

const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const studentRoutes = require('./routes/students')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)

    if (origin === 'http://localhost:5173' || origin === 'http://localhost:5174') {
      return callback(null, true)
    }

    if (origin.endsWith('.vercel.app')) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Orange-Uni Student Portal API is running.' })
})

app.use('/auth', authRoutes)
app.use('/students', studentRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' })
})

app.listen(PORT, () => {
  console.log(`Orange-Uni API running on port ${PORT}`)
})
