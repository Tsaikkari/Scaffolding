import express from 'express'

import { getProducts, createProduct } from '../controllers/product'
import tokenVerify from '../middlewares/tokenVerify'
import rootAccount from '../middlewares/rootAccount'
import admin from'../middlewares/admin'

const router = express.Router()

router.post('/', admin, rootAccount, tokenVerify, createProduct)
router.get('/', getProducts)

export default router