import express, { Request, Response, NextFunction, request } from 'express'

const app = express()

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hello')
})

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.send('this is test route')
})

app.listen(3001)

