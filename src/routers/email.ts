import express from 'express'

import * as emailController from '../controllers/email'

const router = express.Router()

// user sends reset form data
router.post('/user/:username', emailController.sendPasswordResetEmail)
// user sends new password form data
router.post('/new-password/:id/:token', emailController.receiveNewPassword)
router.post('/customer', emailController.sendEmailCustomer)
router.post('/member', emailController.sendEmailMember)

export default router