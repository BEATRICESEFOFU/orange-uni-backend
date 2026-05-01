require('dotenv').config()

const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const studentRoutes = require('./routes/students')

// Create app FIRST
const app = express()
const PORT = process.env.PORT || 5000

// ✅ Updated CORS (IMPORTANT CHANGE)
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    /\.vercel\.app$/
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use(express.json())

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Orange-Uni Student Portal API is running.' })
})

// Routes
app.use('/auth', authRoutes)
app.use('/students', studentRoutes)

// Fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Orange-Uni API running on port ${PORT}`)
})
``