import { Request, Response, NextFunction } from 'express'

import {
  NotFoundError,
  UnauthorizedError,
  InternalServerError,
  BadRequestError,
} from '../helpers/apiError'
import Product from '../entities/Product.postgres'

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = req.body
    const newProduct = Product.create({ ...product })
    const savedProduct = await Product.save(newProduct)

    res.deliver(200, 'Success', savedProduct)
  } catch (error) {
    next(new InternalServerError(error.message))
  }
}

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find({ relations: ['orders'] })
    res.deliver(200, 'Success', products)
  } catch (error) {
    next(new NotFoundError('Products not found'))
  }
}


