import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.get('/api', (req: Request, res: Response, next: NextFunction) => {
    res.json({ dont: 'stress' })
    res.send('Dont stress')
})

export default router