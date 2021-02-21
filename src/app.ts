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

const app = express()
console.log('APP IS IN ENVIRONMENT ', ENVIRONMENT)
//**Express configuration*/

app.set('port', process.env.PORT || 5000)

//**Use common 3rd-party middlewares*/
app.use(cors())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

//**All routers here*/

//**Custom API error handler*/
app.use(apiErrorHandler)
app.use(apiContentType)

export default app
