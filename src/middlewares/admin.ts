import { Request, Response, NextFunction } from 'express'

import { InternalServerError, NotFoundError, UnauthorizedError } from '../helpers/apiError'
import User from '../entities/User.postgres'

const admin = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const user = req.user as User

    if (!user) {
      return next(new NotFoundError('user not found'))
    }
    if (user.isAdmin !== true) {
      return next(new UnauthorizedError('Not an admin'))
    }
    return next()

    // if (user && user.isAdmin === true) {
    //   return next()
    // } else {
    //   return next(new UnauthorizedError('Not authorized as an admin'))
    // }
  }

export default admin