import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import lusca from 'lusca'
import 'reflect-metadata'
import { ENVIRONMENT } from './util/secrets'
import passport from 'passport'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import responseHandler from './middlewares/responseHandler'
import { local, jwt } from './passport/config'

import userRouter from './routers/user'
import loginRouter from './routers/login'
import productRouter from './routers/product'
import emailRouter from './routers/email'
import stressRouter from './routers/stress'

const app = express()
console.log('APP IS IN ENVIRONMENT ', ENVIRONMENT)
//Express configuration
app.set('port', process.env.PORT || 3001)

//Use common 3rd-party middlewares
app.use(cors())
app.use(compression())

// passport
app.use(passport.initialize())
passport.use(local)
passport.use(jwt)

app.use(responseHandler)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

//All routers here
app.use('/stress', stressRouter)
app.use('/user', userRouter)
app.use('/', loginRouter)
app.use('/products', productRouter)
app.use('/email', emailRouter)

//Custom API error handler
app.use(apiErrorHandler)
app.use(apiContentType)

export default app
