import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Record from './models/Record.js'

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/records')
  .then(() => console.log('MongoDB connected'))

app.get('/records', async (req, res) => {
  const records = await Record.find().sort({ createdAt: -1 })
  res.json(records)
})

app.post('/records', async (req, res) => {
  const record = await Record.create({ name: req.body.name, email: req.body.email })
  res.json(record)
})

app.delete('/records/:id', async (req, res) => {
  await Record.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

app.listen(3001, () => console.log('Server running on port 3001'))
