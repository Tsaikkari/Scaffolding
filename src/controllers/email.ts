import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const nodemailer = require("nodemailer")
const mg = require("nodemailer-mailgun-transport")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")


import User from '../entities/User.postgres'
import { InternalServerError } from '../helpers/apiError'

export const transporter = nodemailer.createTransport({
  service: 'Change password',
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Reset password email
export const getPasswordResetURL = (user: any, token: any) =>
  `http://localhost:3000/password/reset/${user.id}/${token}`

export const resetPasswordTemplate = (user: any, url: any) => {
  const from = process.env.EMAIL_LOGIN
  const to = user.email
  const subject = 'Change password'
  const html = `
  <p>Hi ${user.email},</p>
  <p>Click the link to change password:</p>
  <a href=${url}>${url}</a>
  <p>The link expires in an hour.</p>
  `

  return { from, to, subject, html }
}

// sign jwt using dynamic payload and secret key
export const usePasswordHashToMakeToken = ({
  password: hashedPassword,
  id: userId,
  createdAt,
}: any) => {
  const secret = hashedPassword + '-' + createdAt
  const token = jwt.sign({ userId }, secret, {
    expiresIn: 3600,
  })
  return token
}

// Sendgrid on the route '/reset-password/user/:email' emails user a url containing the token
export const sendPasswordResetEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.params
  let user
  try {
    user = await User.findOne({ email })
  } catch (err) {
    res.status(404).json('No user with that email')
  }
  // signed jwt
  const token = usePasswordHashToMakeToken(user)
  const url = getPasswordResetURL(user, token)
  const emailTemplate = resetPasswordTemplate(user, url)
  const sendEmail = () => {
    transporter.sendMail(emailTemplate, (err: any, info: any) => {
      if (err) {
        return next(new InternalServerError())
      }
      console.log('Email sent', info.response)
    })
  }
  sendEmail()
}

// decode token using secret key, hash new password and replace old hash
export const receiveNewPassword = (req: Request, res: Response) => {
  const { userId, token } = req.params
  const { password } = req.body

  User.findOne({ where: { id: userId } })
    .then((user) => {
      const secret = user?.password + '-' + user?.createdAt
      //@ts-ignore
      const payload = jwt.decode(token, secret)
      if (payload?.userId === user?.id) {
        bcrypt.genSalt(10, function (err, salt) {
          // Call error-handling middleware:
          if (err) return
          bcrypt.hash(password, salt, function (err, hash) {
            // Call error-handling middleware:
            if (err) return
            User.findOne({ where: { id: userId, password: hash } })
            User.update(userId, password)
              .then(() => res.deliver(202, 'Password changed successfully'))
              //@ts-ignore
              .catch((err: any) => res.deliver(500, err))
          })
        })
      }
    })
    .catch(() => {
      res.deliver(404, 'Invalid user')
    })
}

//send email to member
export const sendEmailCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email

    // authentication
    

    //create content
    
    // call api
    
  } catch (error) {
    next(new InternalServerError())
  }
}

//send email to member
export const sendEmailMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email

    // authentication
    

    //create content
    

    // call api
    
  } catch (error) {
    next(new InternalServerError())
  }
}

