import "dotenv/config"
import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from "socket.io"

import { router } from "./routes"

const app = express()

app.use(cors())

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

io.on("connection",socket => console.log(`Usuário conectado no socket ${socket.id}`))

app.use(express.json())

app.use(router)

app.get('/github', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})
app.get('/signin/callback', (req, res) => {
  const { code } = req.query
  return res.json({ "message": code })
})

export { httpServer, io }
