import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'

import { loadEvents } from './data/events'

const app = express()
const port = 3333

app.use(
  cookieParser(),
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (origin?.includes('localhost')) {
        return callback(null, true)
      }

      callback(null, false)
    },
  }),
)

const isLoggedIn = (req: Request) => !!req.cookies?.Auth

app.get('/events', (req: Request, res: Response) => {
  res.json(loadEvents(isLoggedIn(req)))
})

app.get('/user', (req: Request, res: Response) => {
  if (isLoggedIn(req)) {
    return res.status(200).json({ user: 'Multi-rate User' })
  }

  return res.status(401).send()
})

app.post('/login', (req: Request, res: Response) => {
  res
    .status(200)
    .cookie('Auth', true)
    .send()
})

app.post('/logout', (req: Request, res: Response) => {
  res
    .status(204)
    .clearCookie('Auth')
    .send()
})

app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`)
})
