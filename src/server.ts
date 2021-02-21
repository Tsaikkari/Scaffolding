import { createConnection } from 'typeorm'

import app from './app'
import ormConfig from './util/secrets'

createConnection({ ...ormConfig })
  .then(() => console.log('connected to pg'))
  .catch((e) => console.log(e))

const server = app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

export default server
