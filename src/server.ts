import { createConnection } from 'typeorm'

import app from './app'
import ormConfig from './util/secrets'

createConnection({ ...ormConfig })
  .then(() => console.log('connected to pg'))
  .catch((e) => console.log(e))

const port = process.env.PORT || 3001

const server = app.listen(port)

export default server
